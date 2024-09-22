import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    purple: {
      500: '#7C3AED', // Roboflow's purple
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
});

export default theme;