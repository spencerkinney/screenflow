import React, { useState, useEffect, useRef } from 'react';
import { Box, VStack, Heading, Image, Text, Button } from '@chakra-ui/react';

const ResultsPage = ({ results, onReset }) => {
  const [scale, setScale] = useState(1);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (imageRef.current) {
        const img = imageRef.current;
        const maxWidth = window.innerWidth * 0.8;
        const maxHeight = window.innerHeight * 0.6;
        const widthScale = maxWidth / img.naturalWidth;
        const heightScale = maxHeight / img.naturalHeight;
        const newScale = Math.min(widthScale, heightScale, 1);
        setScale(newScale);
        setDimensions({
          width: img.naturalWidth * newScale,
          height: img.naturalHeight * newScale
        });
      }
    };

    const img = imageRef.current;
    if (img && img.complete) {
      updateDimensions();
    } else if (img) {
      img.onload = updateDimensions;
    }

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [results.imageSrc]);

  return (
    <VStack spacing={6} align="center" justify="center" w="100%" maxW="800px" p={4}>
      <Heading as="h2" size="lg" fontWeight="medium">Detection Results</Heading> {/* Reduced font size and weight */}
      <Box position="relative" width={`${dimensions.width}px`} height={`${dimensions.height}px`}>
        <Image
          ref={imageRef}
          src={results.imageSrc}
          objectFit="contain"
          w="100%"
          h="100%"
        />
        {results.boundingBoxes.map((box, index) => (
          <Box
            key={index}
            position="absolute"
            left={`${box.x}%`}
            top={`${box.y}%`}
            width={`${box.width}%`}
            height={`${box.height}%`}
            border="2px solid purple"
            pointerEvents="none"
          >
            <Text fontSize={`${Math.max(10, 14 * scale)}px`} bg="purple.500" color="white" p={1} borderRadius="md" boxShadow="sm">
              {box.label}
            </Text>
          </Box>
        ))}
      </Box>
      <Button onClick={onReset} variant="outline" colorScheme="purple" size="lg">
        Analyze Another Screenshot
      </Button>
    </VStack>
  );
};

export default ResultsPage;