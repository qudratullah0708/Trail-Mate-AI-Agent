import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Card,
  CardBody,
  Avatar,
  Badge,
  Spinner,
  useColorModeValue,
  IconButton,
  Flex,
  Progress,
  Textarea,
  Button,
  useToast,
  Fade,
  Collapse,
  Grid,
  GridItem,
  Link,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  FaPaperPlane, 
  FaRobot, 
  FaUser, 
  FaHotel, 
  FaMapMarkerAlt, 
  FaDollarSign,
  FaClock,
  FaStar,
  FaExternalLinkAlt,
  FaHeart,
  FaMagic,
  FaPlane,
  FaUmbrellaBeach,
  FaMountain,
} from 'react-icons/fa';
import type { ChatMessage, AgentStatus } from '../types';
import CostBreakdownTable from '../components/common/CostBreakdownTable';

interface TripPlan {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  budget: {
    min: number;
    max: number;
  };
  accommodation?: {
    title: string;
    price: number;
    location: string;
    rating: number;
    reviews: number;
    url: string;
  };
  activities?: Array<{
    name: string;
    cost: number;
    description: string;
    day?: number;
  }>;
  totalCost?: number;
  itinerary?: Array<{
    day: number;
    date: string;
    activities: string[];
    cost: number;
  }>;
}

interface CostItem {
  day: number;
  date?: string;
  activity: string;
  cost: number;
  location?: string;
}

// Function to extract cost table data from markdown text
const extractCostTableData = (content: string): CostItem[] => {
  const costItems: CostItem[] = [];
  
  // Look for table patterns in the content
  const tableRegex = /\|\s*Day\s*\|\s*Activity\s*\|\s*Cost\s*\|[\s\S]*?\n(?=\n|$)/gi;
  const tableMatch = content.match(tableRegex);
  
  if (tableMatch) {
    const tableContent = tableMatch[0];
    const rows = tableContent.split('\n').filter(row => row.includes('|') && !row.includes('---'));
    
    rows.slice(1).forEach(row => { // Skip header row
      const cells = row.split('|').map(cell => cell.trim()).filter(cell => cell);
      if (cells.length >= 3) {
        const dayMatch = cells[0].match(/(\d+)/);
        const day = dayMatch ? parseInt(dayMatch[1]) : 0;
        const activity = cells[1];
        const costMatch = cells[2].match(/[\d,]+/);
        const cost = costMatch ? parseInt(costMatch[0].replace(/,/g, '')) : 0;
        
        if (day && activity && cost) {
          costItems.push({
            day,
            activity,
            cost,
            date: `Day ${day}`,
          });
        }
      }
    });
  }
  
  // Alternative: Look for day-by-day cost patterns
  if (costItems.length === 0) {
    const dayPatterns = content.match(/Day \d+[^$]*?\$[\d,]+/gi);
    if (dayPatterns) {
      dayPatterns.forEach(pattern => {
        const dayMatch = pattern.match(/Day (\d+)/);
        const costMatch = pattern.match(/\$(\d+(?:,\d+)*)/);
        const activityMatch = pattern.match(/Day \d+[^:]*:\s*([^$]*)/);
        
        if (dayMatch && costMatch) {
          const day = parseInt(dayMatch[1]);
          const cost = parseInt(costMatch[1].replace(/,/g, ''));
          const activity = activityMatch ? activityMatch[1].trim() : `Day ${day} Activities`;
          
          costItems.push({
            day,
            activity: activity.substring(0, 50) + (activity.length > 50 ? '...' : ''),
            cost,
            date: `Day ${day}`,
          });
        }
      });
    }
  }
  
  return costItems.sort((a, b) => a.day - b.day);
};

// Function to calculate total cost from extracted data
const calculateTotalCost = (costItems: CostItem[]): number => {
  return costItems.reduce((total, item) => total + item.cost, 0);
};

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>({
    accommodation: 'idle',
    experience: 'idle',
    budget: 'idle',
  });
  const [currentPlan, setCurrentPlan] = useState<TripPlan | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  // Removed showExamples state – no longer needed
  const [apiError, setApiError] = useState<string | null>(null);
  const [costTableData, setCostTableData] = useState<CostItem[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  const cardBg = useColorModeValue('white', 'gray.800');
  const agentMessageBg = useColorModeValue('gray.100', 'gray.700');
  // Enhanced scroll behavior
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  };

  // Improved useEffect for scrolling
  useEffect(() => {
    const timer = setTimeout(scrollToBottom, 100); // Delay to ensure content is rendered
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  // Initialize with beautiful welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: '1',
        role: 'agent',
        content: "This is a placeholder for the welcome card.", // Content for the welcome card
        timestamp: new Date().toISOString(),
        agentType: 'experience',
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  // API call to backend - ONLY real API, no mock fallback
  const callPlanningAPI = async (userInput: string) => {
    try {
      setApiError(null);
      const response = await fetch('http://127.0.0.1:8000/plan-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userInput,
        }),
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data); // Debug log
      return data;
    } catch (error) {
      console.error('API Error:', error);
      setApiError(error instanceof Error ? error.message : 'Unknown error occurred');
      throw error;
    }
  };

  const simulateAgentProgress = () => {
    const steps: Array<{ status: AgentStatus; progress: number }> = [
      { status: { accommodation: 'processing', experience: 'idle', budget: 'idle' }, progress: 20 },
      { status: { accommodation: 'processing', experience: 'processing', budget: 'idle' }, progress: 50 },
      { status: { accommodation: 'completed', experience: 'processing', budget: 'idle' }, progress: 70 },
      { status: { accommodation: 'completed', experience: 'completed', budget: 'processing' }, progress: 90 },
      { status: { accommodation: 'completed', experience: 'completed', budget: 'completed' }, progress: 100 },
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setAgentStatus(step.status);
        setProcessingProgress(step.progress);
      }, (index + 1) * 1000);
    });
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim()) return;

    // Hide welcome card if it's the first message being sent
    if (messages.length === 1 && messages[0].id === '1') {
      setMessages([]);
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setProcessingProgress(0);
    // removed setShowExamples – examples feature deprecated
    setApiError(null);

    try {
      const response = await callPlanningAPI(textToSend);
      
      // Handle different response types based on intent
      let agentResponseContent = '';
      let shouldSimulateProgress = false;
      const agentType: 'accommodation' | 'experience' | 'budget' = 'experience';

      if (response.intent === 'general_info') {
        // For general info queries, show response immediately
        agentResponseContent = response.response || 'I received your message but couldn\'t process it properly.';
        setIsLoading(false);
        setProcessingProgress(100);
      } else if (response.intent === 'trip_planning') {
        // For trip planning, simulate agent progress and show optimized plan
        shouldSimulateProgress = true;
        agentResponseContent = response.optimized_plan || response.message || 'Trip planning completed!';
        
        // Extract cost table data from the response
        const costItems = extractCostTableData(agentResponseContent);
        if (costItems.length > 0) {
          setCostTableData(costItems);
        }
        
        // Try to extract trip plan data if available
        if (response.extracted_data) {
          const extractedData = response.extracted_data;
          const tripPlan: TripPlan = {
            destination: extractedData.destination || 'Unknown',
            checkIn: extractedData.check_in || '',
            checkOut: extractedData.check_out || '',
            guests: extractedData.guests || 1,
            budget: {
              min: extractedData.min_budget || 0,
              max: extractedData.max_budget || 0,
            },
            totalCost: costItems.length > 0 ? calculateTotalCost(costItems) : extractedData.max_budget || 0,
          };
          setCurrentPlan(tripPlan);
        }
      } else {
        // Fallback for unknown intent
        agentResponseContent = response.message || response.response || 'I processed your request successfully!';
      }

      if (shouldSimulateProgress) {
        // Start agent simulation for trip planning
        simulateAgentProgress();
        
        setTimeout(() => {
          const agentResponse: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'agent',
            content: agentResponseContent,
            timestamp: new Date().toISOString(),
            agentType: agentType,
          };

          setMessages(prev => [...prev, agentResponse]);
          setIsLoading(false);
          setProcessingProgress(100);

          toast({
            title: "Trip Plan Ready!",
            description: "Your personalized itinerary has been created.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }, 5000);
      } else {
        // Show response immediately for general info
        const agentResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'agent',
          content: agentResponseContent,
          timestamp: new Date().toISOString(),
          agentType: agentType,
        };

        setMessages(prev => [...prev, agentResponse]);

        toast({
          title: "Response Ready!",
          description: "I've answered your question.",
          status: "info",
          duration: 2000,
          isClosable: true,
        });
      }

    } catch {
      setIsLoading(false);
      setAgentStatus({
        accommodation: 'error',
        experience: 'error',
        budget: 'error',
      });
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        role: 'agent',
        content: `❌ **Connection Error**

I'm having trouble connecting to the travel planning service. This could be because:

• The backend server isn't running
• There's a network connectivity issue
• The API endpoint is temporarily unavailable

**To resolve this:**
1. Make sure your FastAPI server is running on http://127.0.0.1:8000
2. Check your internet connection
3. Try your request again in a moment

*Error details: ${apiError || 'Unknown error'}*`,
        timestamp: new Date().toISOString(),
        agentType: 'experience',
      };

      setMessages(prev => [...prev, errorMessage]);

      toast({
        title: "Connection Error",
        description: "Unable to connect to the travel planning service. Please check if the backend is running.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getAgentIcon = (agentType?: string) => {
    switch (agentType) {
      case 'accommodation':
        return <FaHotel />;
      case 'experience':
        return <FaMapMarkerAlt />;
      case 'budget':
        return <FaDollarSign />;
      default:
        return <FaRobot />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'yellow';
      case 'completed':
        return 'green';
      case 'error':
        return 'red';
      default:
        return 'gray';
    }
  };



  return (
    <Box minHeight="100vh" pb="120px" bg={useColorModeValue('gray.50', 'gray.900')}> 
      <Container maxW="full" py={4} px={4}>
        <Grid 
          templateColumns={{ base: "1fr", md: "300px 1fr" }} 
          gap={6} 
          height="calc(100vh - 120px)"
          position="relative"
        > 
          
          {/* Left Sidebar - Agent Status & Trip Plan */}
          <GridItem 
            display={{ base: currentPlan ? "block" : "none", md: "block" }}
            position={{ base: "absolute", md: "relative" }}
            zIndex={{ base: 10, md: 1 }}
            width={{ base: "100%", md: "auto" }}
            bg={cardBg}
            p={2}
            borderRadius="xl"
            shadow="xl"
          >
            <Flex 
              direction="column" 
              height="100%" 
              maxHeight="calc(100vh - 200px)" 
              overflowY="auto" 
              gap={4}
              sx={{ scrollbarWidth: 'thin' }}
            >
              
              {/* Agent Status Card - Always Visible */}
              <Card 
                w="100%" 
                bg={cardBg} 
                shadow="lg"
                _hover={{ transform: 'translateY(-2px)' }}
                transition="all 0.3s ease"
                borderRadius="xl"
                overflow="hidden"
                // Removed sticky for better stacking
              >
                <CardBody p={4}>
                  <VStack spacing={3}>
                    <HStack justify="space-between" w="100%">
                      <HStack spacing={2}>
                        <Box
                          as={FaMagic}
                          color="brand.500"
                          transform="rotate(-10deg)"
                          transition="transform 0.3s ease"
                          _hover={{ transform: 'rotate(10deg)' }}
                        />
                        <Text fontWeight="bold" fontSize="md">AI Agents</Text>
                      </HStack>
                      {isLoading && (
                        <Progress
                          value={processingProgress}
                          size="sm"
                          colorScheme="brand"
                          w="80px"
                          borderRadius="full"
                          isAnimated
                          hasStripe
                        />
                      )}
                    </HStack>
                    
                    <VStack spacing={3} w="100%">
                      {Object.entries(agentStatus).map(([agent, status]) => (
                        <HStack 
                          key={agent}
                          justify="space-between" 
                          w="100%"
                          p={2}
                          bg="gray.50"
                          borderRadius="lg"
                          transition="all 0.2s"
                          _hover={{ transform: 'translateX(5px)' }}
                        >
                          <HStack spacing={2}>
                            {getAgentIcon(agent)}
                            <Text fontSize="sm" fontWeight="medium" textTransform="capitalize">
                              {agent}
                            </Text>
                          </HStack>
                          <Badge 
                            size="sm"
                            colorScheme={getStatusColor(status)}
                            variant="subtle"
                            px={2}
                            py={1}
                            borderRadius="full"
                          >
                            {status}
                          </Badge>
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>

              {/* Trip Plan Summary - Enhanced */}
              <Collapse in={!!currentPlan} animateOpacity style={{ width: '100%' }}>
                {currentPlan && (
                  <Card 
                    w="100%" 
                    bg={cardBg} 
                    shadow="lg"
                    borderRadius="xl"
                    overflow="hidden"
                    _hover={{ transform: 'translateY(-2px)' }}
                    transition="all 0.3s ease"
                  >
                    <CardBody p={4}>
                      <VStack spacing={4} align="stretch">
                        <HStack justify="space-between">
                          <HStack spacing={2}>
                            <Box
                              as={FaHeart}
                              color="red.400"
                              transform="scale(1)"
                              transition="transform 0.3s ease"
                              _hover={{ transform: 'scale(1.2)' }}
                            />
                            <Text fontWeight="bold" fontSize="md">Your Trip</Text>
                          </HStack>
                          <Badge 
                            colorScheme="green" 
                            variant="subtle"
                            px={3}
                            py={1}
                            borderRadius="full"
                          >
                            Ready!
                          </Badge>
                        </HStack>
                        
                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                          {[
                            { icon: FaMapMarkerAlt, label: 'Destination', value: currentPlan.destination },
                            { icon: FaClock, label: 'Duration', value: `${currentPlan.itinerary?.length || costTableData.length || 4} days` },
                            { icon: FaUser, label: 'Travelers', value: `${currentPlan.guests} people` },
                            { icon: FaDollarSign, label: 'Total Cost', value: `$${currentPlan.totalCost}` }
                          ].map((item, index) => (
                            <Box 
                              key={index}
                              p={3}
                              bg="gray.50"
                              borderRadius="lg"
                              transition="all 0.2s"
                              _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                            >
                              <HStack spacing={2}>
                                <Box as={item.icon} color="brand.500" />
                                <VStack align="start" spacing={0}>
                                  <Text fontSize="xs" color="gray.500">{item.label}</Text>
                                  <Text fontSize="sm" fontWeight="semibold">{item.value}</Text>
                                </VStack>
                              </HStack>
                            </Box>
                          ))}
                        </Grid>

                        {/* Accommodation Details */}
                        {currentPlan.accommodation && (
                          <Box>
                            <Divider my={3} />
                            <VStack 
                              align="start" 
                              spacing={3}
                              p={3}
                              bg="gray.50"
                              borderRadius="lg"
                              transition="all 0.2s"
                              _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                            >
                              <HStack justify="space-between" w="100%">
                                <Text fontSize="sm" fontWeight="bold">🏨 Accommodation</Text>
                                <Badge colorScheme="blue" variant="subtle">Selected</Badge>
                              </HStack>
                              <Text fontSize="sm">{currentPlan.accommodation.title}</Text>
                              <HStack justify="space-between" w="100%">
                                <HStack spacing={1}>
                                  <FaStar size="12px" color="gold" />
                                  <Text fontSize="sm">{currentPlan.accommodation.rating}</Text>
                                </HStack>
                                <Text fontSize="sm" fontWeight="bold" color="green.500">
                                  ${currentPlan.accommodation.price}
                                </Text>
                              </HStack>
                              <Link 
                                href={currentPlan.accommodation.url} 
                                isExternal
                                _hover={{ textDecoration: 'none' }}
                              >
                                <Button
                                  size="sm"
                                  colorScheme="brand"
                                  rightIcon={<FaExternalLinkAlt />}
                                  variant="outline"
                                  _hover={{
                                    transform: 'translateY(-2px)',
                                    shadow: 'md'
                                  }}
                                  transition="all 0.2s"
                                >
                                  View Details
                                </Button>
                              </Link>
                            </VStack>
                          </Box>
                        )}
                        {/* Add Accordion for cost breakdown */}
                        <Accordion allowToggle>
                          <AccordionItem border="none">
                            <AccordionButton>
                              <Box flex="1" textAlign="left">
                                <Text fontSize="sm" fontWeight="semibold">Cost Breakdown</Text>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                              {costTableData.length > 0 && (
                                <Box overflowX="auto">
                                  <CostBreakdownTable
                                    costItems={costTableData}
                                    totalCost={calculateTotalCost(costTableData)}
                                    currency="$"
                                  />
                                </Box>
                              )}
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </VStack>
                    </CardBody>
                  </Card>
                )}
              </Collapse>

              {/* Moved cost breakdown to accordion inside trip card */}
            </Flex>
          </GridItem>

          {/* Right Side - Chat Area */}
          <GridItem display="flex" flexDirection="column">
            
            {/* Chat Messages */}
            <Box
              flex="1"
              w="100%"
              overflowY="auto"
              borderRadius="xl"
              bg={cardBg}
              shadow="lg"
              maxHeight="100%"
              sx={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: useColorModeValue('gray.300', 'gray.600'),
                  borderRadius: '24px',
                },
              }}
            >
              <VStack spacing={4} align="stretch" p={4}>
                {messages.map((message, index) => (
                  (index === 0 && messages.length === 1) ? (
                    <Card key={message.id} bg={cardBg} shadow="xl" borderRadius="xl" p={4}>
                      <CardBody>
                        <VStack spacing={5}>
                          <HStack>
                            <FaMagic size="24px" color="purple" /> 
                            <Text fontWeight="bold" fontSize="2xl">Welcome to TrailMate!</Text>
                          </HStack>
                          <Text textAlign="center" maxW="lg">
                            I'm your AI-powered travel companion, ready to craft your perfect journey.
                            To get started, tell me about your dream trip, or pick one of these popular requests:
                          </Text>
                          <HStack spacing={4} pt={4}>
                              <Button 
                                leftIcon={<FaUmbrellaBeach/>} 
                                colorScheme="blue" 
                                variant="outline"
                                onClick={() => handleSendMessage("I want a luxury beach vacation in Maldives from Dec 15-22 for 2 people with a budget of $5000-8000")}
                                _hover={{transform: 'translateY(-2px)', shadow: 'md'}}
                              >
                                Beach Getaway
                              </Button>
                              <Button 
                                leftIcon={<FaMountain/>} 
                                colorScheme="green"
                                variant="outline"
                                onClick={() => handleSendMessage("Plan an adventure trip to Switzerland from July 10-17 for 4 people, budget $3000-5000, love hiking and skiing")}
                                _hover={{transform: 'translateY(-2px)', shadow: 'md'}}
                              >
                                Adventure Trip
                              </Button>
                              <Button 
                                leftIcon={<FaPlane/>} 
                                colorScheme="purple"
                                variant="outline"
                                onClick={() => handleSendMessage("I want to visit Tokyo from March 5-12 for 2 people, budget $2000-4000, interested in culture and food")}
                                _hover={{transform: 'translateY(-2px)', shadow: 'md'}}
                              >
                                City Break
                              </Button>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ) : message.id !== '1' && (
                  <Fade 
                    key={message.id} 
                    in={true} 
                    transition={{ enter: { duration: 0.3 } }}
                  >
                    <Flex
                      justify={message.role === 'user' ? 'flex-end' : 'flex-start'}
                      mb={2}
                    >
                      <HStack
                        maxW="85%"
                        spacing={3}
                        flexDirection={message.role === 'user' ? 'row-reverse' : 'row'}
                      >
                        <Avatar
                          size="sm"
                          icon={message.role === 'user' ? <FaUser /> : getAgentIcon(message.agentType)}
                          bg={message.role === 'user' ? 'brand.500' : 'gray.400'}
                          p={1}
                          transition="all 0.2s"
                          _hover={{ transform: 'scale(1.1)' }}
                        />
                        <Box
                          bg={message.role === 'user' ? 'brand.500' : agentMessageBg}
                          color={message.role === 'user' ? 'white' : 'inherit'}
                          px={4}
                          py={3}
                          borderRadius="2xl"
                          shadow="sm"
                          maxW="100%"
                          transition="all 0.2s"
                          _hover={{ transform: 'translateY(-1px)', shadow: 'md' }}
                        >
                          {message.agentType && (
                            <HStack mb={2} spacing={1}>
                              {getAgentIcon(message.agentType)}
                              <Text fontSize="xs" opacity={0.8} fontWeight="semibold">
                                {message.agentType.toUpperCase()} AGENT
                              </Text>
                            </HStack>
                          )}
                          <Box 
                            fontSize="sm" 
                            lineHeight="1.6"
                            sx={{
                              '& p': { mb: 2 },
                              '& ul': { pl: 4, mb: 2 },
                              '& li': { mb: 1 },
                            }}
                          >
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {message.content}
                            </ReactMarkdown>
                          </Box>
                          <Text 
                            fontSize="xs" 
                            opacity={0.6} 
                            mt={2} 
                            textAlign="right"
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                          >
                            <FaClock style={{ marginRight: '4px' }} />
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </Text>
                        </Box>
                      </HStack>
                    </Flex>
                  </Fade>
                  )
                ))}
                
                {/* Loading Message */}
                {isLoading && (
                  <Fade in={isLoading}>
                    <Flex justify="flex-start">
                      <HStack spacing={3}>
                        <Avatar 
                          size="sm" 
                          icon={<FaRobot />} 
                          bg="gray.400"
                          transition="all 0.2s"
                          _hover={{ transform: 'scale(1.1)' }}
                        />
                        <Box
                          bg={agentMessageBg}
                          px={4}
                          py={3}
                          borderRadius="2xl"
                          shadow="sm"
                          maxW="100%"
                        >
                          <VStack spacing={3} align="start">
                            <HStack>
                              <Spinner size="sm" color="brand.500" />
                              <Text fontSize="sm" fontWeight="semibold">
                                🔍 Crafting your perfect trip...
                              </Text>
                            </HStack>
                            <Progress
                              value={processingProgress}
                              size="sm"
                              colorScheme="brand"
                              w="250px"
                              borderRadius="full"
                              isAnimated
                              hasStripe
                            />
                            <Text fontSize="xs" opacity={0.7}>
                              Searching accommodations, activities, and optimizing your budget
                            </Text>
                          </VStack>
                        </Box>
                      </HStack>
                    </Flex>
                  </Fade>
                )}
                <div ref={messagesEndRef} />
              </VStack>
            </Box>

            {/* Message Input */}
            <Box w="100%" position="relative" pt={4} flexShrink={0}>
              <Card 
                bg={cardBg} 
                shadow="lg"
                borderRadius="xl"
                _hover={{ transform: 'translateY(-2px)' }}
                transition="all 0.3s ease"
              >
                <CardBody p={4}>
                  <HStack spacing={3}>
                    <Textarea
                      placeholder="✨ Describe your dream trip... (e.g., a sunny beach vacation in Greece for a week)"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isLoading}
                      resize="none"
                      rows={2}
                      borderRadius="xl"
                      border="2px"
                      borderColor={useColorModeValue('gray.200', 'gray.600')}
                      _focus={{ 
                        borderColor: 'brand.500', 
                        shadow: 'md',
                        transform: 'translateY(-2px)'
                      }}
                      _hover={{
                        borderColor: 'brand.400'
                      }}
                      transition="all 0.2s"
                      spellCheck="false"
                    />
                    <VStack spacing={1}>
                      <IconButton
                        aria-label="Send message"
                        icon={<FaPaperPlane />}
                        onClick={() => handleSendMessage()}
                        disabled={isLoading || !inputValue.trim()}
                        colorScheme="brand"
                        size="lg"
                        borderRadius="full"
                        _hover={{ 
                          transform: 'translateY(-2px) scale(1.05)',
                          shadow: 'md',
                          bg: 'brand.600',
                          color: 'white',
                        }}
                        _active={{
                          transform: 'translateY(0) scale(0.95)'
                        }}
                        transition="all 0.2s"
                      />
                      <Text fontSize="xs" color="gray.500">
                        Enter ↵
                      </Text>
                    </VStack>
                  </HStack>
                </CardBody>
              </Card>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default ChatPage; 