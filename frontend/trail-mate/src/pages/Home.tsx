import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Card,
  CardBody,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkedAlt, FaHotel, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const features = [
    {
      icon: FaMapMarkedAlt,
      title: 'Smart Destination Planning',
      description: 'AI-powered recommendations for activities and attractions based on your interests.',
    },
    {
      icon: FaHotel,
      title: 'Perfect Accommodations',
      description: 'Find the best places to stay within your budget and preferences.',
    },
    {
      icon: FaCalendarAlt,
      title: 'Optimized Itineraries',
      description: 'Day-by-day planning that maximizes your time and experience.',
    },
    {
      icon: FaDollarSign,
      title: 'Budget Optimization',
      description: 'Smart budget allocation to get the most value from your trip.',
    },
  ];

  const handleStartPlanning = () => {
    navigate('/chat');
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box bg="brand.500" color="white" py={20}>
        <Container maxW="7xl">
          <VStack spacing={8} textAlign="center">
            <Heading size="2xl" fontWeight="bold">
              Plan Your Perfect Trip with AI
            </Heading>
            <Text fontSize="xl" maxW="2xl">
              TrailMate uses advanced AI agents to help you discover amazing accommodations, 
              plan exciting activities, and optimize your budget for the perfect travel experience.
            </Text>
            <Button
              size="lg"
              bg="white"
              color="brand.500"
              _hover={{ bg: 'gray.100' }}
              onClick={handleStartPlanning}
            >
              Start Planning Your Trip
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="7xl" py={20}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="xl">How TrailMate Works</Heading>
            <Text color={textColor} fontSize="lg" maxW="3xl">
              Our AI-powered agents work together to create personalized travel plans 
              that match your preferences, budget, and travel style.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {features.map((feature, index) => (
              <Card key={index} bg={cardBg} height="100%">
                <CardBody>
                  <VStack spacing={4} textAlign="center" height="100%">
                    <Icon as={feature.icon} boxSize={12} color="brand.500" />
                    <Heading size="md">{feature.title}</Heading>
                    <Text color={textColor} fontSize="sm">
                      {feature.description}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* CTA Section */}
      <Box bg="gray.100" _dark={{ bg: 'gray.800' }} py={16}>
        <Container maxW="4xl">
          <VStack spacing={8} textAlign="center">
            <Heading size="xl">Ready to Start Your Adventure?</Heading>
            <Text color={textColor} fontSize="lg">
              Tell us about your dream destination and let our AI agents 
              create the perfect itinerary for you.
            </Text>
            <HStack spacing={4}>
              <Button
                size="lg"
                onClick={handleStartPlanning}
              >
                Start Planning
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/profile')}
              >
                View Saved Trips
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 