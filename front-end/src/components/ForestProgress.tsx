"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Progress,
  SimpleGrid,
  Badge,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { getGameInstance } from '@/utils/gameLogic';
import { keyframes } from '@emotion/react';

// Animations
const growAnimation = keyframes`
  0% { transform: scale(0.8); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const pulseAnimation = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

interface ForestRegion {
  id: string;
  name: string;
  description: string;
  targetTrees: number;
  currentTrees: number;
  status: 'deforested' | 'recovering' | 'restored' | 'thriving';
  wildlife: string[];
  carbonOffset: number;
  icon: string;
}

const FOREST_REGIONS: ForestRegion[] = [
  {
    id: 'amazon-basin',
    name: 'Amazon Basin',
    description: 'Tropical rainforest restoration in the heart of South America',
    targetTrees: 10000,
    currentTrees: 0,
    status: 'deforested',
    wildlife: ['Jaguar', 'Macaw', 'Capybara', 'Sloth'],
    carbonOffset: 0,
    icon: '🌴',
  },
  {
    id: 'boreal-forest',
    name: 'Boreal Forest',
    description: 'Northern coniferous forest restoration in Canada and Russia',
    targetTrees: 8000,
    currentTrees: 0,
    status: 'deforested',
    wildlife: ['Moose', 'Wolf', 'Bear', 'Lynx'],
    carbonOffset: 0,
    icon: '🌲',
  },
  {
    id: 'african-savanna',
    name: 'African Savanna',
    description: 'Acacia and baobab restoration in East Africa',
    targetTrees: 6000,
    currentTrees: 0,
    status: 'deforested',
    wildlife: ['Elephant', 'Giraffe', 'Lion', 'Zebra'],
    carbonOffset: 0,
    icon: '🌳',
  },
  {
    id: 'temperate-forest',
    name: 'Temperate Forest',
    description: 'Mixed deciduous forest restoration in Europe and North America',
    targetTrees: 5000,
    currentTrees: 0,
    status: 'deforested',
    wildlife: ['Deer', 'Fox', 'Owl', 'Squirrel'],
    carbonOffset: 0,
    icon: '🍁',
  },
];

export default function ForestProgress() {
  const [regions, setRegions] = useState<ForestRegion[]>(FOREST_REGIONS);
  const [selectedRegion, setSelectedRegion] = useState<ForestRegion | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Update regions based on game state
  useEffect(() => {
    const game = getGameInstance();
    const gameState = game.getState();
    const totalTrees = gameState.treesPlanted;
    
    // Distribute trees across regions
    const updatedRegions = regions.map((region, index) => {
      const regionShare = Math.floor(totalTrees / regions.length);
      const extraTrees = totalTrees % regions.length;
      const currentTrees = regionShare + (index < extraTrees ? 1 : 0);
      
      // Calculate progress percentage
      const progress = Math.min((currentTrees / region.targetTrees) * 100, 100);
      
      // Determine status based on progress
      let status: ForestRegion['status'] = 'deforested';
      if (progress >= 100) status = 'thriving';
      else if (progress >= 75) status = 'restored';
      else if (progress >= 25) status = 'recovering';
      
      // Calculate carbon offset for this region
      const carbonOffset = currentTrees * 22; // Average CO2 offset per tree
      
      return {
        ...region,
        currentTrees,
        status,
        carbonOffset,
      };
    });
    
    setRegions(updatedRegions);
  }, [regions]);

  const getStatusColor = (status: ForestRegion['status']) => {
    switch (status) {
      case 'deforested': return 'red';
      case 'recovering': return 'orange';
      case 'restored': return 'green';
      case 'thriving': return 'blue';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: ForestRegion['status']) => {
    switch (status) {
      case 'deforested': return '🔥';
      case 'recovering': return '🌱';
      case 'restored': return '🌳';
      case 'thriving': return '🌿';
      default: return '❓';
    }
  };

  const handleRegionClick = (region: ForestRegion) => {
    setSelectedRegion(region);
    onOpen();
  };

  return (
    <Box
      position="relative"
      borderRadius="xl"
      overflow="hidden"
      color="white"
    >
      {/* Background Image */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgImage="url('/campaign/recoveredwildlife.jpg')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        filter="brightness(0.3)"
      />
      {/* Overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="linear-gradient(135deg, rgba(45, 90, 39, 0.9) 0%, rgba(139, 69, 19, 0.9) 100%)"
      />
      {/* Content */}
      <Box position="relative" p={6}>
        <VStack spacing={6} align="stretch">
          <Box textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" mb={2}>
              🌍 Global Forest Restoration Progress
            </Text>
            <Text fontSize="sm" opacity={0.8}>
              Track the recovery of deforested regions around the world
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {regions.map((region) => (
              <Box
                key={region.id}
                bg="rgba(255, 255, 255, 0.1)"
                borderRadius="lg"
                p={4}
                cursor="pointer"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.15)",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.2s"
                onClick={() => handleRegionClick(region)}
                animation={`${growAnimation} 0.5s ease-out`}
              >
                <VStack spacing={3} align="stretch">
                  <Flex justify="space-between" align="center">
                    <HStack spacing={2}>
                      <Text fontSize="2xl">{region.icon}</Text>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold" fontSize="lg">
                          {region.name}
                        </Text>
                        <Text fontSize="xs" opacity={0.8}>
                          {region.currentTrees.toLocaleString()} / {region.targetTrees.toLocaleString()} trees
                        </Text>
                      </VStack>
                    </HStack>
                    <Badge
                      colorScheme={getStatusColor(region.status)}
                      variant="solid"
                      fontSize="sm"
                    >
                      <HStack spacing={1}>
                        <Text>{getStatusIcon(region.status)}</Text>
                        <Text>{region.status.charAt(0).toUpperCase() + region.status.slice(1)}</Text>
                      </HStack>
                    </Badge>
                  </Flex>

                  <Box>
                    <Flex justify="space-between" mb={1}>
                      <Text fontSize="xs">Restoration Progress</Text>
                      <Text fontSize="xs">
                        {Math.round((region.currentTrees / region.targetTrees) * 100)}%
                      </Text>
                    </Flex>
                    <Progress
                      value={(region.currentTrees / region.targetTrees) * 100}
                      colorScheme={getStatusColor(region.status)}
                      borderRadius="full"
                      size="sm"
                    />
                  </Box>

                  <SimpleGrid columns={2} spacing={2}>
                    <Box textAlign="center">
                      <Text fontSize="xs" opacity={0.8}>Carbon Offset</Text>
                      <Text fontSize="sm" fontWeight="bold" color="blue.300">
                        {Math.round(region.carbonOffset).toLocaleString()} kg
                      </Text>
                    </Box>
                    <Box textAlign="center">
                      <Text fontSize="xs" opacity={0.8}>Wildlife</Text>
                      <Text fontSize="sm" fontWeight="bold" color="orange.300">
                        {region.wildlife.length} species
                      </Text>
                    </Box>
                  </SimpleGrid>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>

          {/* Global statistics */}
          <Box
            bg="rgba(255, 255, 255, 0.1)"
            borderRadius="lg"
            p={4}
          >
            <Text fontWeight="bold" mb={3} textAlign="center">
              🌍 Global Impact Summary
            </Text>
            <SimpleGrid columns={3} spacing={4}>
              <Box textAlign="center">
                <Text fontSize="xs" opacity={0.8}>Total Trees Planted</Text>
                <Text fontSize="xl" fontWeight="bold" color="green.300">
                  {regions.reduce((sum, r) => sum + r.currentTrees, 0).toLocaleString()}
                </Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="xs" opacity={0.8}>Carbon Offset</Text>
                <Text fontSize="xl" fontWeight="bold" color="blue.300">
                  {Math.round(regions.reduce((sum, r) => sum + r.carbonOffset, 0)).toLocaleString()} kg
                </Text>
              </Box>
              <Box textAlign="center">
                <Text fontSize="xs" opacity={0.8}>Regions Restored</Text>
                <Text fontSize="xl" fontWeight="bold" color="green.300">
                  {regions.filter(r => r.status === 'restored' || r.status === 'thriving').length}
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        </VStack>

        {/* Region Detail Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent bg="gray.800" color="white">
            <ModalHeader>
              <HStack spacing={3}>
                <Text fontSize="2xl">{selectedRegion?.icon}</Text>
                <Text>{selectedRegion?.name}</Text>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {selectedRegion && (
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text fontSize="sm" opacity={0.8} mb={2}>
                      {selectedRegion.description}
                    </Text>
                    <Badge
                      colorScheme={getStatusColor(selectedRegion.status)}
                      variant="solid"
                      fontSize="md"
                    >
                      <HStack spacing={2}>
                        <Text>{getStatusIcon(selectedRegion.status)}</Text>
                        <Text>{selectedRegion.status.charAt(0).toUpperCase() + selectedRegion.status.slice(1)}</Text>
                      </HStack>
                    </Badge>
                  </Box>

                  <Box>
                    <Text fontWeight="bold" mb={2}>Restoration Progress</Text>
                    <Progress
                      value={(selectedRegion.currentTrees / selectedRegion.targetTrees) * 100}
                      colorScheme={getStatusColor(selectedRegion.status)}
                      borderRadius="full"
                      size="lg"
                      mb={2}
                    />
                    <Text fontSize="sm">
                      {selectedRegion.currentTrees.toLocaleString()} of {selectedRegion.targetTrees.toLocaleString()} trees planted
                    </Text>
                  </Box>

                  <SimpleGrid columns={2} spacing={4}>
                    <Box
                      bg="rgba(255, 255, 255, 0.1)"
                      p={3}
                      borderRadius="md"
                      textAlign="center"
                    >
                      <Text fontSize="sm" opacity={0.8}>Carbon Offset</Text>
                      <Text fontSize="lg" fontWeight="bold" color="blue.300">
                        {Math.round(selectedRegion.carbonOffset).toLocaleString()} kg CO₂
                      </Text>
                    </Box>
                    <Box
                      bg="rgba(255, 255, 255, 0.1)"
                      p={3}
                      borderRadius="md"
                      textAlign="center"
                    >
                      <Text fontSize="sm" opacity={0.8}>Forest Area</Text>
                      <Text fontSize="lg" fontWeight="bold" color="green.300">
                        {Math.round(selectedRegion.currentTrees * 25).toLocaleString()} m²
                      </Text>
                    </Box>
                  </SimpleGrid>

                  <Box>
                    <Text fontWeight="bold" mb={2}>Wildlife Species</Text>
                    <SimpleGrid columns={2} spacing={2}>
                      {selectedRegion.wildlife.map((animal, index) => (
                        <Box
                          key={index}
                          bg="rgba(255, 255, 255, 0.1)"
                          p={2}
                          borderRadius="md"
                          textAlign="center"
                          animation={`${pulseAnimation} 2s ease-in-out infinite`}
                          style={{ animationDelay: `${index * 0.2}s` }}
                        >
                          <Text fontSize="sm">{animal}</Text>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Box>

                  {selectedRegion.status === 'thriving' && (
                    <Box
                      bg="green.600"
                      p={3}
                      borderRadius="md"
                      textAlign="center"
                      animation={`${floatAnimation} 3s ease-in-out infinite`}
                    >
                      <Text fontWeight="bold">🎉 This region has been fully restored!</Text>
                      <Text fontSize="sm">Wildlife has returned and the ecosystem is thriving.</Text>
                    </Box>
                  )}
                </VStack>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
} 