import React, { useState } from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './theme';
import MainPage from './components/MainPage';
import ResultsPage from './components/ResultsPage';
import LoadingScreen from './components/LoadingScreen';

const App = () => {
  const [currentStep, setCurrentStep] = useState('main');
  const [results, setResults] = useState(null);

  const handleImageUpload = (file) => {
    setCurrentStep('loading');
    // Simulate API call
    setTimeout(() => {
      setResults({ 
        imageSrc: URL.createObjectURL(file),
        boundingBoxes: [
          { x: 10, y: 20, width: 15, height: 10, label: 'Chrome' },
          { x: 50, y: 40, width: 20, height: 15, label: 'Spotify' },
        ]
      });
      setCurrentStep('results');
    }, 3000);
  };

  const resetApp = () => {
    setResults(null);
    setCurrentStep('main');
  };

  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
          {currentStep === 'main' && <MainPage onUpload={handleImageUpload} />}
          {currentStep === 'loading' && <LoadingScreen />}
          {currentStep === 'results' && results && <ResultsPage results={results} onReset={resetApp} />}
        </Box>
      </ChakraProvider>
    </Router>
  );
};

export default App;