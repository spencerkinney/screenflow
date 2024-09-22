import React from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const StartPage = () => {
  return (
    <VStack spacing={8} align="center" justify="center" h="100vh" p={4}>
      <Heading as="h1" size="2xl" textAlign="center">
        Icon Detection App
      </Heading>
      <Text textAlign="center" maxW="600px">
        Upload an image and get bounding boxes around application icons. This project uses
        the <code>roboflow-autolabel</code> package for computer vision-based computer control.
      </Text>
      <Button as={Link} to="/upload" colorScheme="purple" size="lg">
        Get Started
      </Button>
    </VStack>
  );
};

export default StartPage;