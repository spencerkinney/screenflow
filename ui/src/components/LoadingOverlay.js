import React, { useState, useEffect } from 'react';
import { Box, Text, keyframes } from '@chakra-ui/react';

const fillAnimation = keyframes`
  0% { width: 0%; }
  100% { width: 100%; }
`;

const LoadingOverlay = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0, 0, 0, 0.7)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      zIndex={9999}
    >
      <Box
        width="80%"
        maxWidth="400px"
        height="20px"
        bg="gray.200"
        borderRadius="full"
        overflow="hidden"
      >
        <Box
          width={`${progress}%`}
          height="100%"
          bg="green.500"
          borderRadius="full"
          transition="width 0.3s ease-out"
          animation={`${fillAnimation} 3s ease-out`}
        />
      </Box>
      <Text color="white" mt={4} fontSize="lg" fontWeight="bold">
        Analyzing screenshot...
      </Text>
    </Box>
  );
};

export default LoadingOverlay;