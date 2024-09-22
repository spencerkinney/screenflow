import React, { useState } from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from './theme';
import MainPage from './components/MainPage';
import FullScreenResultsView from './components/FullScreenResultsView';
import LoadingOverlay from './components/LoadingOverlay';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleImageUpload = (file) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults({ 
        imageSrc: URL.createObjectURL(file),
        boundingBoxes: [
          { x: 10, y: 20, width: 15, height: 10, label: 'Chrome' },
          { x: 50, y: 40, width: 20, height: 15, label: 'Spotify' },
        ]
      });
      setIsLoading(false);
    }, 3000);
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