import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Card,
  CardBody,
  CardHeader,
  Text,
  Badge,
  HStack,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaCalendarDay, FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';

interface CostItem {
  day: number;
  date?: string;
  activity: string;
  cost: number;
  location?: string;
}

interface CostBreakdownTableProps {
  costItems: CostItem[];
  totalCost: number;
  currency?: string;
}

const CostBreakdownTable: React.FC<CostBreakdownTableProps> = ({
  costItems,
  totalCost,
  currency = '$'
}) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const headerBg = useColorModeValue('brand.50', 'brand.900');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const alternatingBg = useColorModeValue('gray.50', 'gray.700');
  const theadBg = useColorModeValue('gray.100', 'gray.900');
  const hoverBg = useColorModeValue('brand.50', 'brand.900');

  const formatCurrency = (amount: number) => {
    return `${currency}${amount.toLocaleString()}`;
  };

  const getDayColor = (day: number) => {
    const colors = ['blue', 'green', 'purple', 'orange', 'teal', 'pink', 'cyan'];
    return colors[day % colors.length];
  };

  return (
    <Card bg={cardBg} shadow="lg" borderRadius="xl" overflow="hidden">
      <CardHeader bg={headerBg} py={4}>
        <HStack justify="space-between" align="center">
          <HStack spacing={3}>
            <FaDollarSign color="green" size="20px" />
            <Text fontWeight="bold" fontSize="lg" color={textColor}>
              Trip Cost Breakdown
            </Text>
          </HStack>
          <Badge colorScheme="green" variant="solid" fontSize="md" px={3} py={1}>
            Total: {formatCurrency(totalCost)}
          </Badge>
        </HStack>
      </CardHeader>

      <CardBody p={0}>
        <Box overflowX="auto">
          <Table variant="simple" size="md">
            <Thead bg={theadBg}>
              <Tr>
                <Th color={textColor} fontWeight="bold">
                  <HStack spacing={2}>
                    <FaCalendarDay />
                    <Text>Day</Text>
                  </HStack>
                </Th>
                <Th color={textColor} fontWeight="bold">Date</Th>
                <Th color={textColor} fontWeight="bold">
                  <HStack spacing={2}>
                    <FaMapMarkerAlt />
                    <Text>Activity/Location</Text>
                  </HStack>
                </Th>
                <Th color={textColor} fontWeight="bold" isNumeric>
                  <HStack spacing={2} justify="flex-end">
                    <FaDollarSign />
                    <Text>Cost</Text>
                  </HStack>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {costItems.map((item, index) => (
                <Tr
                  key={index}
                  bg={index % 2 === 0 ? 'transparent' : alternatingBg}
                  _hover={{
                    bg: hoverBg,
                    transform: 'translateY(-1px)',
                    shadow: 'md',
                  }}
                  transition="all 0.2s"
                >
                  <Td>
                    <Badge
                      colorScheme={getDayColor(item.day)}
                      variant="solid"
                      borderRadius="full"
                      px={3}
                      py={1}
                    >
                      Day {item.day}
                    </Badge>
                  </Td>
                  <Td>
                    <Text fontSize="sm" color={textColor}>
                      {item.date || `Day ${item.day}`}
                    </Text>
                  </Td>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold" color={textColor}>
                        {item.activity}
                      </Text>
                      {item.location && (
                        <Text fontSize="xs" color="gray.500">
                          📍 {item.location}
                        </Text>
                      )}
                    </VStack>
                  </Td>
                  <Td isNumeric>
                    <Text
                      fontWeight="bold"
                      color={item.cost > 1000 ? 'red.500' : 'green.500'}
                      fontSize="md"
                    >
                      {formatCurrency(item.cost)}
                    </Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Box p={4} bg={headerBg}>
          <HStack justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" color="gray.600">
                Trip Duration
              </Text>
              <Text fontWeight="bold" color={textColor}>
                {costItems.length} days
              </Text>
            </VStack>
            
            <VStack align="center" spacing={1}>
              <Text fontSize="sm" color="gray.600">
                Average per Day
              </Text>
              <Text fontWeight="bold" color={textColor}>
                {formatCurrency(Math.round(totalCost / costItems.length))}
              </Text>
            </VStack>
            
            <VStack align="end" spacing={1}>
              <Text fontSize="sm" color="gray.600">
                Total Cost
              </Text>
              <Text fontWeight="bold" fontSize="lg" color="green.500">
                {formatCurrency(totalCost)}
              </Text>
            </VStack>
          </HStack>
        </Box>
      </CardBody>
    </Card>
  );
};

export default CostBreakdownTable; 