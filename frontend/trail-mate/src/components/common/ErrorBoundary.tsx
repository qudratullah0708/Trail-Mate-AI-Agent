import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box minH="100vh" bg={bgColor} py={20}>
      <Container maxW="2xl">
        <VStack spacing={8} textAlign="center">
          <FaExclamationTriangle size={64} color="red" />
          <Heading size="xl">Oops! Something went wrong</Heading>
          <Text color={textColor}>
            {error?.message || 'An unexpected error occurred.'}
          </Text>
          <Button
            colorScheme="brand"
            size="lg"
            onClick={resetErrorBoundary}
          >
            Try Again
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const [error, setError] = React.useState<Error | null>(null);

  const handleError = (error: Error) => {
    console.error('Uncaught error:', error);
    setError(error);
  };

  const resetError = () => {
    setError(null);
  };

  React.useEffect(() => {
    window.addEventListener('error', (event) => handleError(event.error));
    return () => {
      window.removeEventListener('error', (event) => handleError(event.error));
    };
  }, []);

  if (error) {
    return <ErrorFallback error={error} resetErrorBoundary={resetError} />;
  }

  return <>{children}</>;
};

export default ErrorBoundary; 