import React, { useCallback } from 'react';
import { Box, VStack, Heading, Text, useColorModeValue, Code } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

const MainPage = ({ onUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const activeBorderColor = useColorModeValue('purple.500', 'purple.300');

  // Define the gradient colors based on Roboflow's theme
  const gradientStart = useColorModeValue('#B794F4', '#9F7AEA'); // Lighter purple
  const gradientEnd = useColorModeValue('#5A67D8', '#4C51BF'); // Roboflow-like purple

  return (
    <VStack spacing={4} align="center" justify="center" w="100%" maxW="600px" p={4}>
      <Heading 
        as="h1" 
        size="2xl" 
        textAlign="center"
        bgGradient={`linear(to-b, ${gradientStart}, ${gradientEnd})`} // Top-to-bottom gradient
        bgClip="text"
        display="inline-flex"
        alignItems="center"
      >
        <Text as="span" mr={2}>🤖</Text> {/* Robot emoji without gradient */}
        <Text as="span">screenflow</Text>
      </Heading>
      <Text fontSize="md" color="gray.600" textAlign="center">
        Upload an image to get bbox of desktop icons. This would be useful in a future where robots control computers. Built with <Code fontSize="sm">pip install roboflow-autolabel</Code>
      </Text>
      <Box
        {...getRootProps()}
        w="100%"
        h="180px"
        border="2px dashed"
        borderColor={isDragActive ? activeBorderColor : borderColor}
        borderRadius="md"
        p={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        transition="all 0.2s"
        _hover={{ borderColor: activeBorderColor }}
      >
        <input {...getInputProps()} />
        <Text textAlign="center" fontSize="md">
          {isDragActive
            ? "Drop screenshot here"
            : "Drag and drop screenshot, or click to select"}
        </Text>
      </Box>
    </VStack>
  );
};

export default MainPage;