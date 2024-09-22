import React, { useState } from 'react';
import { ChakraProvider, Box, useToast } from '@chakra-ui/react';
import theme from './theme';
import MainPage from './components/MainPage';
import FullScreenResultsView from './components/FullScreenResultsView';
import LoadingOverlay from './components/LoadingOverlay';
import { detectIcons } from './services/roboflowService';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const toast = useToast();

  const handleImageUpload = async (file) => {
    setIsLoading(true);
    try {
      const detectionResults = await detectIcons(file);
      setResults({
        imageSrc: URL.createObjectURL(file),
        predictions: detectionResults.predictions
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze the image. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetApp = () => {
    setResults(null);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
        <MainPage onUpload={handleImageUpload} />
        {isLoading && <LoadingOverlay />}
        {results && (
          <FullScreenResultsView
            results={results}
            onClose={resetApp}
          />
        )}
      </Box>
    </ChakraProvider>
  );
};

export default App;