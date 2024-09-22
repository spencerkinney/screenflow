import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, keyframes } from '@chakra-ui/react';

// Loading messages
const loadingMessages = [
  "Enhancing pixel matrices...",
  "Calibrating neural networks...",
  "Scanning for coffee mugs...",
  "Identifying productivity tools...",
  "Locating hidden Easter eggs...",
  "Analyzing desktop clutter...",
  "Detecting cat-like objects...",
];

// Keyframes for smooth fading animation
const fadeAnimation = keyframes`
  0% { opacity: 0; transform: translateY(-10px); }
  50% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(10px); }
`;

const LoadingScreen = () => {
  const [message, setMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <VStack spacing={8} align="center" justify="center" w="100%" maxW="800px" p={4}>
      <Box
        fontSize="3xl"
        color="purple.500"
        fontWeight="bold"
        animation={`${fadeAnimation} 2s ease-in-out infinite`}
      >
        Loading...
      </Box>
      <Text
        fontSize="lg"
        color="gray.600"
        textAlign="center"
        animation={`${fadeAnimation} 2s ease-in-out infinite`}
      >
        {message}
      </Text>
    </VStack>
  );
};

export default LoadingScreen;
