import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Skeleton,
  useToast,
  Input,
  InputGroup,
  InputLeftElement,
  Badge,
  Divider,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaChevronUp,
  FaChevronDown,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const ItineraryPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const toast = useToast();
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const activityBg = useColorModeValue('gray.50', 'gray.700');

  // Simulated itinerary data
  const itineraryData = {
    tripName: 'Paris Adventure 2024',
    dates: '15-20 June 2024',
    days: [
      {
        id: 1,
        date: '2024-06-15',
        activities: [
          {
            id: 1,
            time: '09:00',
            name: 'Eiffel Tower Visit',
            location: 'Champ de Mars',
            duration: '2 hours',
            type: 'attraction',
          },
          {
            id: 2,
            time: '12:00',
            name: 'Lunch at Le Cheval d\'Or',
            location: 'Latin Quarter',
            duration: '1.5 hours',
            type: 'dining',
          },
          {
            id: 3,
            time: '14:00',
            name: 'Louvre Museum',
            location: 'Rue de Rivoli',
            duration: '3 hours',
            type: 'museum',
          },
        ],
      },
      {
        id: 2,
        date: '2024-06-16',
        activities: [
          {
            id: 4,
            time: '10:00',
            name: 'Notre-Dame Cathedral',
            location: 'Île de la Cité',
            duration: '1.5 hours',
            type: 'attraction',
          },
          {
            id: 5,
            time: '13:00',
            name: 'Seine River Cruise',
            location: 'Port de la Bourdonnais',
            duration: '2 hours',
            type: 'activity',
          },
        ],
      },
    ],
  };

  // Simulate data loading
  useState(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic here
  };

  const handleActivityAction = (activityId: number, action: string) => {
    toast({
      title: `Activity ${action}`,
      description: `Successfully ${action} activity #${activityId}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box>
      {/* Header Section */}
      <Box bg="brand.500" color="white" py={16}>
        <Container maxW="7xl">
          <VStack spacing={6} textAlign="center">
            <Heading size="xl">
              {isLoading ? (
                <Skeleton height="50px" width="300px" />
              ) : (
                itineraryData.tripName
              )}
            </Heading>
            <HStack spacing={2}>
              <FaCalendarAlt />
              <Text fontSize="lg">
                {isLoading ? (
                  <Skeleton height="24px" width="200px" />
                ) : (
                  itineraryData.dates
                )}
              </Text>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxW="7xl" py={16}>
        <VStack spacing={8} w="100%">
          {/* Search Bar */}
          <InputGroup maxW="md">
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </InputGroup>

          {/* Itinerary Days */}
          <VStack spacing={8} w="100%">
            {isLoading ? (
              Array(2).fill(0).map((_, i) => (
                <Skeleton key={i} height="300px" w="100%" />
              ))
            ) : (
              itineraryData.days.map((day) => (
                <MotionCard
                  key={day.id}
                  w="100%"
                  bg={cardBg}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardBody>
                    <VStack spacing={6} align="stretch">
                      <HStack justify="space-between">
                        <Heading size="md">Day {day.id}</Heading>
                        <Text color={textColor}>{day.date}</Text>
                      </HStack>
                      
                      <Divider borderColor={borderColor} />

                      {day.activities.map((activity, index) => (
                        <Box key={activity.id}>
                          {index > 0 && (
                            <Box
                              h="20px"
                              borderLeft="2px"
                              borderColor="brand.500"
                              ml="15px"
                              my="-10px"
                            />
                          )}
                          <HStack spacing={4} align="flex-start">
                            <Box
                              w="30px"
                              h="30px"
                              borderRadius="full"
                              bg="brand.500"
                              color="white"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <FaClock size="12px" />
                            </Box>
                            <VStack
                              flex={1}
                              spacing={2}
                              align="start"
                              bg={activityBg}
                              p={4}
                              borderRadius="md"
                              as={motion.div}
                              whileHover={{ x: 10 }}
                            >
                              <HStack justify="space-between" w="100%">
                                <Heading size="sm">{activity.name}</Heading>
                                <Badge colorScheme="brand">{activity.type}</Badge>
                              </HStack>
                              <HStack color={textColor}>
                                <FaClock />
                                <Text fontSize="sm">{activity.time}</Text>
                                <Text fontSize="sm">({activity.duration})</Text>
                              </HStack>
                              <HStack color={textColor}>
                                <FaMapMarkerAlt />
                                <Text fontSize="sm">{activity.location}</Text>
                              </HStack>
                              <HStack spacing={2}>
                                <IconButton
                                  aria-label="Edit activity"
                                  icon={<FaEdit />}
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleActivityAction(activity.id, 'edited')}
                                />
                                <IconButton
                                  aria-label="Delete activity"
                                  icon={<FaTrash />}
                                  size="sm"
                                  variant="ghost"
                                  colorScheme="red"
                                  onClick={() => handleActivityAction(activity.id, 'deleted')}
                                />
                                <IconButton
                                  aria-label="Move up"
                                  icon={<FaChevronUp />}
                                  size="sm"
                                  variant="ghost"
                                  isDisabled={index === 0}
                                />
                                <IconButton
                                  aria-label="Move down"
                                  icon={<FaChevronDown />}
                                  size="sm"
                                  variant="ghost"
                                  isDisabled={index === day.activities.length - 1}
                                />
                              </HStack>
                            </VStack>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </CardBody>
                </MotionCard>
              ))
            )}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default ItineraryPage; 