import { Box, Container, Heading, Text, VStack, SimpleGrid, Card, CardBody, Icon, Badge, HStack, useColorModeValue } from '@chakra-ui/react';
import { FaHotel, FaHome, FaBed, FaBuilding } from 'react-icons/fa';

const AccommodationsPage = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const accommodationTypes = [
    {
      icon: FaHotel,
      title: 'Hotels',
      description: 'Luxury and boutique hotels with full service amenities.',
      features: ['Room Service', '24/7 Reception', 'Daily Cleaning'],
    },
    {
      icon: FaHome,
      title: 'Vacation Rentals',
      description: 'Entire homes and apartments for a local experience.',
      features: ['Full Kitchen', 'Privacy', 'More Space'],
    },
    {
      icon: FaBed,
      title: 'Bed & Breakfast',
      description: 'Cozy stays with homemade breakfast included.',
      features: ['Home Cooking', 'Local Hosts', 'Personal Touch'],
    },
    {
      icon: FaBuilding,
      title: 'Serviced Apartments',
      description: 'Long-stay ready apartments with hotel amenities.',
      features: ['Kitchen', 'Workspace', 'Laundry'],
    },
  ];

  return (
    <Box>
      {/* Header Section */}
      <Box bg="brand.500" color="white" py={16}>
        <Container maxW="7xl">
          <VStack spacing={6} textAlign="center">
            <Heading size="xl">Find Your Perfect Stay</Heading>
            <Text fontSize="lg" maxW="2xl">
              Discover accommodations that match your preferences and budget,
              carefully selected by our Accommodation Agent.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Accommodation Types Section */}
      <Container maxW="7xl" py={16}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="lg">Accommodation Types</Heading>
            <Text color={textColor} maxW="2xl">
              Browse through our selection of carefully curated accommodations
              to find the perfect match for your stay.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="100%">
            {accommodationTypes.map((type, index) => (
              <Card key={index} bg={cardBg} height="100%">
                <CardBody>
                  <VStack spacing={4} textAlign="center">
                    <Icon as={type.icon} boxSize={10} color="brand.500" />
                    <Heading size="md">{type.title}</Heading>
                    <Text color={textColor} fontSize="sm">
                      {type.description}
                    </Text>
                    <HStack spacing={2} flexWrap="wrap" justify="center">
                      {type.features.map((feature, i) => (
                        <Badge key={i} colorScheme="brand" variant="subtle">
                          {feature}
                        </Badge>
                      ))}
                    </HStack>
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

export default AccommodationsPage; 