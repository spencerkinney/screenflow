import React, { useState, useEffect, useRef } from 'react';
import { Box, Image, Text, keyframes } from '@chakra-ui/react';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const EscKeyIndicator = () => (
  <Box
    position="fixed"
    top={4}
    right={4}
    bg="rgba(0, 0, 0, 0.6)"
    color="white"
    fontSize="sm"
    fontWeight="bold"
    px={3}
    py={2}
    borderRadius="md"
    zIndex={9999}
    animation={`${fadeIn} 0.3s ease-in`}
  >
    ESC
  </Box>
);

const FullScreenResultsView = ({ results, onClose }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (imageRef.current && containerRef.current) {
        const img = imageRef.current;
        const container = containerRef.current;
        const containerAspectRatio = container.clientWidth / container.clientHeight;
        const imageAspectRatio = img.naturalWidth / img.naturalHeight;

        let newWidth, newHeight;

        if (containerAspectRatio > imageAspectRatio) {
          newHeight = container.clientHeight;
          newWidth = newHeight * imageAspectRatio;
        } else {
          newWidth = container.clientWidth;
          newHeight = newWidth / imageAspectRatio;
        }

        setDimensions({ width: newWidth, height: newHeight });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, [results.imageSrc]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const getColorForClass = (className) => {
    switch (className.toLowerCase()) {
      case 'chrome': return 'blue.500';
      case 'spotify': return 'green.500';
      case 'discord': return 'purple.500';
      default: return 'yellow.500';
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="black"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={9998}
      ref={containerRef}
    >
      <EscKeyIndicator />
      <Box
        position="relative"
        width={`${dimensions.width}px`}
        height={`${dimensions.height}px`}
      >
        <Image
          ref={imageRef}
          src={results.imageSrc}
          objectFit="contain"
          w="100%"
          h="100%"
        />
        {results.predictions.map((prediction, index) => (
          <Box
            key={index}
            position="absolute"
            left={`${(prediction.x - prediction.width / 2) / imageRef.current?.naturalWidth * 100}%`}
            top={`${(prediction.y - prediction.height / 2) / imageRef.current?.naturalHeight * 100}%`}
            width={`${prediction.width / imageRef.current?.naturalWidth * 100}%`}
            height={`${prediction.height / imageRef.current?.naturalHeight * 100}%`}
            border="2px solid"
            borderColor={getColorForClass(prediction.class)}
            borderRadius="sm"
            pointerEvents="none"
          >
            <Box
              position="absolute"
              top="-1.5em"
              left={0}
              bg={getColorForClass(prediction.class)}
              color="white"
              fontSize="sm"
              fontWeight="bold"
              px={2}
              py={1}
              borderRadius="sm"
              whiteSpace="nowrap"
            >
              {`${prediction.class} (${(prediction.confidence * 100).toFixed(1)}%)`}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FullScreenResultsView;