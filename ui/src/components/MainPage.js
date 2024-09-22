import React, { useCallback, useState } from 'react';
import { Box, VStack, Heading, Text, useColorModeValue, Code, keyframes } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const MainPage = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false),
  });

  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const activeBorderColor = useColorModeValue('green.500', 'green.300');

  const gradientStart = useColorModeValue('#B794F4', '#9F7AEA');
  const gradientEnd = useColorModeValue('#5A67D8', '#4C51BF');

  return (
    <VStack spacing={4} align="center" justify="center" w="100%" maxW="600px" p={4}>
      <Heading 
        as="h1" 
        size="2xl" 
        textAlign="center"
        bgGradient={`linear(to-b, ${gradientStart}, ${gradientEnd})`}
        bgClip="text"
        display="inline-flex"
        alignItems="center"
        animation={`${pulseAnimation} 2s infinite ease-in-out`}
      >
        <Text as="span" mr={2}>🤖</Text>
        <Text as="span">screenflow</Text>
      </Heading>
      <Text fontSize="md" color="gray.600" textAlign="center">
        Upload an screenshot to get the bounding box coordinates of desktop icons. This would be useful in a future where robots control computers.
      </Text>
      <Box
        {...getRootProps()}
        w="100%"
        h="180px"
        border="2px dashed"
        borderColor={isDragging ? activeBorderColor : borderColor}
        borderRadius="md"
        p={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        transition="all 0.3s"
        _hover={{ borderColor: activeBorderColor, transform: 'scale(1.02)' }}
        bg={isDragging ? 'green.50' : 'transparent'}
      >
        <input {...getInputProps()} />
        <Text textAlign="center" fontSize="md">
          {isDragging
            ? "Drop screenshot here"
            : "Drag and drop screenshot, or click to select"}
        </Text>
      </Box>
    </VStack>
  );
};

export default MainPage;