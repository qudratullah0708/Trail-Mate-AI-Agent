import {
  Box,
  Container,
  Text,
  HStack,
  VStack,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';

const Footer = () => {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box
      bg={bg}
      borderTop="1px"
      borderColor={borderColor}
      py={8}
      mt="auto"
    >
      <Container maxW="7xl">
        <VStack spacing={4}>
          <HStack spacing={8} wrap="wrap" justify="center">
            <Link href="#" color={textColor} fontSize="sm">
              About
            </Link>
            <Link href="#" color={textColor} fontSize="sm">
              Privacy Policy
            </Link>
            <Link href="#" color={textColor} fontSize="sm">
              Terms of Service
            </Link>
            <Link href="#" color={textColor} fontSize="sm">
              Contact
            </Link>
          </HStack>
          <Text color={textColor} fontSize="sm" textAlign="center">
            © 2024 TrailMate. AI-powered travel planning made simple.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer; 