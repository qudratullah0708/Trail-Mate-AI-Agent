import { Box, Container, Heading, Text, VStack, SimpleGrid, Card, CardBody, Icon, Progress, HStack, useColorModeValue } from '@chakra-ui/react';
import { FaHotel, FaPlane, FaUtensils, FaTicketAlt } from 'react-icons/fa';

const BudgetPage = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const budgetCategories = [
    {
      icon: FaHotel,
      title: 'Accommodation',
      allocated: 40,
      amount: 800,
    },
    {
      icon: FaPlane,
      title: 'Transportation',
      allocated: 25,
      amount: 500,
    },
    {
      icon: FaUtensils,
      title: 'Food & Dining',
      allocated: 20,
      amount: 400,
    },
    {
      icon: FaTicketAlt,
      title: 'Activities',
      allocated: 15,
      amount: 300,
    },
  ];

  return (
    <Box width="100%">
      {/* Header Section */}
      <Box bg="brand.500" color="white" py={16} width="100%">
        <Container maxW="container.xl" width="100%">
          <VStack spacing={6} textAlign="center">
            <Heading size="xl">Budget Optimization</Heading>
            <Text fontSize="lg" maxW="2xl">
              Smart budget allocation and optimization to maximize your travel experience,
              powered by our Budget Optimizer Agent.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Budget Breakdown Section */}
      <Container maxW="container.xl" py={16} width="100%">
        <VStack spacing={12} width="100%">
          <VStack spacing={4} textAlign="center">
            <Heading size="lg">Budget Breakdown</Heading>
            <Text color={textColor} maxW="2xl">
              See how your budget is optimally allocated across different categories
              to ensure the best value for your trip.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="100%">
            {budgetCategories.map((category, index) => (
              <Card key={index} bg={cardBg} height="100%">
                <CardBody>
                  <VStack spacing={4} textAlign="center">
                    <Icon as={category.icon} boxSize={10} color="brand.500" />
                    <Heading size="md">{category.title}</Heading>
                    <VStack w="100%" spacing={2}>
                      <HStack justify="space-between" w="100%">
                        <Text color={textColor} fontSize="sm">Allocated:</Text>
                        <Text fontWeight="bold">{category.allocated}%</Text>
                      </HStack>
                      <Progress
                        value={category.allocated}
                        colorScheme="brand"
                        w="100%"
                        borderRadius="full"
                      />
                      <Text color="brand.500" fontSize="lg" fontWeight="bold">
                        ${category.amount}
                      </Text>
                    </VStack>
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

export default BudgetPage; 