import React, { useState, useEffect, useRef } from 'react';
import { Box, Image, keyframes } from '@chakra-ui/react';

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
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && imageRef.current) {
        const containerAspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        const imageAspect = imageRef.current.naturalWidth / imageRef.current.naturalHeight;

        let newScale;
        if (containerAspect > imageAspect) {
          newScale = containerRef.current.clientHeight / imageRef.current.naturalHeight;
        } else {
          newScale = containerRef.current.clientWidth / imageRef.current.naturalWidth;
        }
        setScale(newScale);
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial calculation
    if (imageRef.current && imageRef.current.complete) {
      handleResize();
    } else if (imageRef.current) {
      imageRef.current.onload = handleResize;
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [results.imageSrc]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
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
      <Box position="relative" height="100%" width="100%">
        <Image
          ref={imageRef}
          src={results.imageSrc}
          objectFit="contain"
          maxH="100%"
          maxW="100%"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
        {results.predictions.map((prediction, index) => (
          <Box
            key={index}
            position="absolute"
            left={`calc(50% + ${(prediction.x - imageRef.current?.naturalWidth / 2) * scale}px)`}
            top={`calc(50% + ${(prediction.y - imageRef.current?.naturalHeight / 2) * scale}px)`}
            width={`${prediction.width * scale}px`}
            height={`${prediction.height * scale}px`}
            transform="translate(-50%, -50%)"
            border="2px solid"
            borderColor={getColorForClass(prediction.class)}
            borderRadius="sm"
            pointerEvents="none"
          >
            <Box
              position="absolute"
              top="-1.5em"
              left="50%"
              transform="translateX(-50%)"
              bg={getColorForClass(prediction.class)}
              color="white"
              fontSize={`${Math.max(12, 14 * scale)}px`}
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