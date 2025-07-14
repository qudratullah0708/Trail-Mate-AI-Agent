import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  useColorModeValue,
  Container,
  IconButton,
  useDisclosure,
  VStack,
  Collapse,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaComments, FaHotel, FaMapMarkedAlt, FaDollarSign, FaRoute, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation();
  
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const linkColor = useColorModeValue('gray.600', 'gray.300');
  const activeLinkColor = useColorModeValue('brand.500', 'brand.300');

  const navItems = [
    { name: 'Chat', path: '/chat', icon: FaComments },
    { name: 'Accommodations', path: '/accommodations', icon: FaHotel },
    { name: 'Activities', path: '/activities', icon: FaMapMarkedAlt },
    { name: 'Budget', path: '/budget', icon: FaDollarSign },
    { name: 'Itinerary', path: '/itinerary', icon: FaRoute },
    { name: 'Profile', path: '/profile', icon: FaUser },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <Box
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      position="sticky"
      top="0"
      zIndex="sticky"
    >
      <Container maxW="7xl">
        <Flex h="16" alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
            <Text fontSize="xl" fontWeight="bold" color="brand.500">
              TrailMate
            </Text>
          </Link>

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                as={RouterLink}
                to={item.path}
                color={isActivePath(item.path) ? activeLinkColor : linkColor}
                fontWeight={isActivePath(item.path) ? 'semibold' : 'normal'}
                _hover={{
                  textDecoration: 'none',
                  color: activeLinkColor,
                }}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <item.icon size={16} />
                {item.name}
              </Link>
            ))}
          </HStack>

          {/* Mobile menu button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
            icon={isOpen ? <FaTimes /> : <FaBars />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>

        {/* Mobile Navigation */}
        <Collapse in={isOpen} animateOpacity>
          <Box pb={4} display={{ md: 'none' }}>
            <VStack spacing={4} align="stretch">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  as={RouterLink}
                  to={item.path}
                  color={isActivePath(item.path) ? activeLinkColor : linkColor}
                  fontWeight={isActivePath(item.path) ? 'semibold' : 'normal'}
                  _hover={{
                    textDecoration: 'none',
                    color: activeLinkColor,
                  }}
                  display="flex"
                  alignItems="center"
                  gap={2}
                  onClick={onToggle}
                >
                  <item.icon size={16} />
                  {item.name}
                </Link>
              ))}
            </VStack>
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Navbar; 