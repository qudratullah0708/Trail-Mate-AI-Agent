import { extendTheme } from '@chakra-ui/react';

// TrailMate color palette
const colors = {
  brand: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Primary blue
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  green: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981', // Secondary green
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // Accent amber
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

// Component styles
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'md',
    },
    variants: {
      solid: {
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
        },
        _active: {
          bg: 'brand.700',
        },
      },
      outline: {
        borderColor: 'brand.500',
        color: 'brand.500',
        _hover: {
          bg: 'brand.50',
        },
      },
      ghost: {
        color: 'brand.500',
        _hover: {
          bg: 'brand.50',
        },
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: 'lg',
        boxShadow: 'sm',
        border: '1px',
        borderColor: 'gray.200',
        _dark: {
          borderColor: 'gray.700',
        },
      },
    },
  },
  Input: {
    variants: {
      outline: {
        field: {
          borderColor: 'gray.300',
          _hover: {
            borderColor: 'brand.300',
          },
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          },
        },
      },
    },
  },
};

// Global styles
const styles = {
  global: {
    body: {
      bg: 'gray.50',
      color: 'gray.800',
      _dark: {
        bg: 'gray.900',
        color: 'gray.100',
      },
    },
  },
};

// Font configuration
const fonts = {
  heading: 'Inter, system-ui, sans-serif',
  body: 'Inter, system-ui, sans-serif',
};

// Breakpoints for responsive design
const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
};

// Theme configuration
export const theme = extendTheme({
  colors,
  components,
  styles,
  fonts,
  breakpoints,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
});

export default theme; 