import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  Avatar,
  Button,
  Skeleton,
  useToast,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Badge,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaSearch, FaUser, FaSuitcase, FaHistory, FaBookmark } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const toast = useToast();
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  // Simulated user data
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    trips: [
      { id: 1, destination: 'Paris', date: '2024-06-15', status: 'upcoming' },
      { id: 2, destination: 'Tokyo', date: '2024-08-20', status: 'planning' },
      { id: 3, destination: 'New York', date: '2024-03-10', status: 'completed' },
    ],
    savedPlaces: [
      { id: 1, name: 'Eiffel Tower', type: 'attraction' },
      { id: 2, name: 'Ritz Hotel', type: 'accommodation' },
      { id: 3, name: 'Le Cheval d\'Or', type: 'restaurant' },
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

  const handleTripAction = (tripId: number, action: string) => {
    toast({
      title: `Trip ${action}`,
      description: `Successfully ${action} trip #${tripId}`,
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
            <Avatar
              size="2xl"
              icon={<FaUser />}
              bg="white"
              color="brand.500"
              as={motion.div}
              whileHover={{ scale: 1.1 }}
            />
            <Heading size="xl">
              {isLoading ? (
                <Skeleton height="50px" width="200px" />
              ) : (
                userData.name
              )}
            </Heading>
            <Text fontSize="lg">
              {isLoading ? (
                <Skeleton height="24px" width="250px" />
              ) : (
                userData.email
              )}
            </Text>
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
              placeholder="Search trips and saved places..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </InputGroup>

          {/* Tabs */}
          <Tabs width="100%" colorScheme="brand" isLazy>
            <TabList>
              <Tab><HStack><FaSuitcase /><Text>My Trips</Text></HStack></Tab>
              <Tab><HStack><FaHistory /><Text>Trip History</Text></HStack></Tab>
              <Tab><HStack><FaBookmark /><Text>Saved Places</Text></HStack></Tab>
            </TabList>

            <TabPanels>
              {/* My Trips */}
              <TabPanel>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {isLoading ? (
                    Array(3).fill(0).map((_, i) => (
                      <Skeleton key={i} height="200px" />
                    ))
                  ) : (
                    userData.trips.map((trip) => (
                      <MotionCard
                        key={trip.id}
                        bg={cardBg}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CardBody>
                          <VStack spacing={4} align="start">
                            <Heading size="md">{trip.destination}</Heading>
                            <Text color={textColor}>{trip.date}</Text>
                            <Badge
                              colorScheme={
                                trip.status === 'upcoming' ? 'green' :
                                trip.status === 'planning' ? 'blue' : 'gray'
                              }
                            >
                              {trip.status}
                            </Badge>
                            <Button
                              size="sm"
                              onClick={() => handleTripAction(trip.id, 'viewed')}
                            >
                              View Details
                            </Button>
                          </VStack>
                        </CardBody>
                      </MotionCard>
                    ))
                  )}
                </SimpleGrid>
              </TabPanel>

              {/* Trip History */}
              <TabPanel>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {isLoading ? (
                    Array(2).fill(0).map((_, i) => (
                      <Skeleton key={i} height="200px" />
                    ))
                  ) : (
                    userData.trips
                      .filter(trip => trip.status === 'completed')
                      .map((trip) => (
                        <MotionCard
                          key={trip.id}
                          bg={cardBg}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CardBody>
                            <VStack spacing={4} align="start">
                              <Heading size="md">{trip.destination}</Heading>
                              <Text color={textColor}>{trip.date}</Text>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleTripAction(trip.id, 'reviewed')}
                              >
                                View Trip Review
                              </Button>
                            </VStack>
                          </CardBody>
                        </MotionCard>
                      ))
                  )}
                </SimpleGrid>
              </TabPanel>

              {/* Saved Places */}
              <TabPanel>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {isLoading ? (
                    Array(3).fill(0).map((_, i) => (
                      <Skeleton key={i} height="200px" />
                    ))
                  ) : (
                    userData.savedPlaces.map((place) => (
                      <MotionCard
                        key={place.id}
                        bg={cardBg}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CardBody>
                          <VStack spacing={4} align="start">
                            <Heading size="md">{place.name}</Heading>
                            <Badge>{place.type}</Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleTripAction(place.id, 'viewed')}
                            >
                              View Details
                            </Button>
                          </VStack>
                        </CardBody>
                      </MotionCard>
                    ))
                  )}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  );
};

export default ProfilePage; 