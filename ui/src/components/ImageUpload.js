import React, { useCallback } from 'react';
import { Box, VStack, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ onUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const activeBorderColor = useColorModeValue('purple.500', 'purple.300');

  return (
    <VStack spacing={8} align="center" justify="center" h="100vh" p={4}>
      <Heading as="h2" size="xl">Upload Screenshot</Heading>
      <Box
        {...getRootProps()}
        w="100%"
        maxW="500px"
        h="300px"
        border="3px dashed"
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
        <Text textAlign="center">
          {isDragActive
            ? "Drop the screenshot here!"
            : "Drag 'n' drop a screenshot here, or click to select one"}
        </Text>
      </Box>
    </VStack>
  );
};

export default ImageUpload;