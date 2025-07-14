import { Box, Container, Heading, Text, VStack, SimpleGrid, Card, CardBody, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaHiking, FaLandmark, FaUtensils, FaTicketAlt } from 'react-icons/fa';

const ActivitiesPage = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const activityCategories = [
    {
      icon: FaHiking,
      title: 'Outdoor Adventures',
      description: 'Explore hiking trails, nature tours, and outdoor activities.',
    },
    {
      icon: FaLandmark,
      title: 'Cultural Experiences',
      description: 'Visit museums, historical sites, and local attractions.',
    },
    {
      icon: FaUtensils,
      title: 'Food & Dining',
      description: 'Discover local cuisine, food tours, and cooking classes.',
    },
    {
      icon: FaTicketAlt,
      title: 'Entertainment',
      description: 'Find shows, concerts, and local events.',
    },
  ];

  return (
    <Box>
      {/* Header Section */}
      <Box bg="brand.500" color="white" py={16}>
        <Container maxW="7xl">
          <VStack spacing={6} textAlign="center">
            <Heading size="xl">Activities & Experiences</Heading>
            <Text fontSize="lg" maxW="2xl">
              Discover amazing activities and attractions for your destination, 
              carefully curated by our Experience Planner Agent.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container maxW="7xl" py={16}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="lg">Explore by Category</Heading>
            <Text color={textColor} maxW="2xl">
              Browse through our curated selection of activities and experiences
              to make your trip unforgettable.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="100%">
            {activityCategories.map((category, index) => (
              <Card key={index} bg={cardBg} height="100%">
                <CardBody>
                  <VStack spacing={4} textAlign="center">
                    <Icon as={category.icon} boxSize={10} color="brand.500" />
                    <Heading size="md">{category.title}</Heading>
                    <Text color={textColor} fontSize="sm">
                      {category.description}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default ActivitiesPage; 