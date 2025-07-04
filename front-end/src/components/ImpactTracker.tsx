"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Progress,
  Badge,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { getGameInstance } from '@/utils/gameLogic';

// Animations
const countUpAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const pulseAnimation = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

interface ImpactMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  description: string;
  icon: string;
  color: string;
  comparison?: string;
}

interface EducationalContent {
  id: string;
  title: string;
  content: string;
  icon: string;
}

const EDUCATIONAL_CONTENT: EducationalContent[] = [
  {
    id: 'carbon-cycle',
    title: 'The Carbon Cycle',
    content: 'Trees absorb carbon dioxide during photosynthesis and store it as biomass. A mature tree can absorb about 22kg of CO2 per year, helping to mitigate climate change.',
    icon: '🌱',
  },
  {
    id: 'biodiversity',
    title: 'Biodiversity Benefits',
    content: 'Forests provide habitat for 80% of terrestrial species. Each tree species supports different wildlife, creating complex ecosystems that are more resilient to environmental changes.',
    icon: '🦋',
  },
  {
    id: 'water-cycle',
    title: 'Water Cycle Regulation',
    content: 'Trees help regulate the water cycle by absorbing rainfall and releasing water vapor through transpiration. This helps prevent soil erosion and maintains water quality.',
    icon: '💧',
  },
  {
    id: 'air-quality',
    title: 'Air Quality Improvement',
    content: 'Trees filter pollutants from the air, including particulate matter, nitrogen oxides, and sulfur dioxide. Urban trees can reduce air pollution by up to 60%.',
    icon: '🌬️',
  },
  {
    id: 'soil-health',
    title: 'Soil Health',
    content: 'Tree roots help prevent soil erosion and improve soil structure. Fallen leaves decompose to create nutrient-rich soil that supports other plant life.',
    icon: '🌍',
  },
  {
    id: 'climate-regulation',
    title: 'Climate Regulation',
    content: 'Forests act as natural air conditioners, cooling the environment through shade and evapotranspiration. They also help regulate local and global climate patterns.',
    icon: '🌡️',
  },
];

export default function ImpactTracker() {
  const [impactMetrics, setImpactMetrics] = useState<ImpactMetric[]>([]);
  const [selectedContent, setSelectedContent] = useState<EducationalContent | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Update impact metrics based on game state
  useEffect(() => {
    const game = getGameInstance();
    const gameState = game.getState();
    const impact = game.calculateEnvironmentalImpact();

    const metrics: ImpactMetric[] = [
      {
        id: 'trees-planted',
        name: 'Trees Planted',
        value: impact.treesPlanted,
        unit: 'trees',
        description: 'Total number of trees planted through donations',
        icon: '🌳',
        color: 'green.400',
        comparison: 'Equivalent to a forest the size of Central Park',
      },
      {
        id: 'carbon-offset',
        name: 'Carbon Offset',
        value: impact.carbonOffset,
        unit: 'kg CO₂',
        description: 'Carbon dioxide removed from the atmosphere',
        icon: '🌍',
        color: 'blue.400',
        comparison: 'Equivalent to taking 2 cars off the road for a year',
      },
      {
        id: 'forest-area',
        name: 'Forest Area',
        value: impact.forestArea,
        unit: 'm²',
        description: 'Total area of forest restored',
        icon: '🌲',
        color: 'green.500',
        comparison: 'Equivalent to 5 football fields',
      },
      {
        id: 'wildlife-returned',
        name: 'Wildlife Returned',
        value: gameState.wildlifeReturned,
        unit: 'animals',
        description: 'Wildlife species attracted back to restored areas',
        icon: '🦌',
        color: 'orange.400',
        comparison: 'Supporting diverse ecosystem recovery',
      },
      {
        id: 'oxygen-produced',
        name: 'Oxygen Produced',
        value: impact.treesPlanted * 118, // kg of oxygen per tree per year
        unit: 'kg O₂',
        description: 'Oxygen produced by the planted trees',
        icon: '💨',
        color: 'cyan.400',
        comparison: 'Enough oxygen for 50 people for a year',
      },
      {
        id: 'water-filtered',
        name: 'Water Filtered',
        value: impact.treesPlanted * 1000, // liters per tree per year
        unit: 'liters',
        description: 'Water filtered and purified by tree roots',
        icon: '💧',
        color: 'blue.300',
        comparison: 'Enough clean water for 100 families',
      },
    ];

    setImpactMetrics(metrics);
  }, []);

  const formatValue = (value: number, unit: string): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M ${unit}`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K ${unit}`;
    } else {
      return `${value.toLocaleString()} ${unit}`;
    }
  };

  return (
    <Box
      bg="linear-gradient(135deg, #2D5A27 0%, #8B4513 100%)"
      borderRadius="xl"
      p={6}
      color="white"
    >
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            📊 Environmental Impact Tracker
          </Text>
          <Text fontSize="sm" opacity={0.8}>
            Real-time tracking of your environmental contributions
          </Text>
        </Box>

        {/* Impact Metrics Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {impactMetrics.map((metric) => (
            <Box
              key={metric.id}
              bg="rgba(255, 255, 255, 0.1)"
              borderRadius="lg"
              p={4}
              textAlign="center"
              _hover={{
                bg: "rgba(255, 255, 255, 0.15)",
                transform: "translateY(-2px)",
              }}
              transition="all 0.2s"
              animation={`${countUpAnimation} 0.5s ease-out`}
            >
              <VStack spacing={3}>
                <Text fontSize="3xl">{metric.icon}</Text>
                <Text fontSize="lg" fontWeight="bold">
                  {formatValue(metric.value, metric.unit)}
                </Text>
                <Text fontSize="sm" fontWeight="bold">
                  {metric.name}
                </Text>
                <Text fontSize="xs" opacity={0.8} textAlign="center">
                  {metric.description}
                </Text>
                {metric.comparison && (
                  <Badge colorScheme="green" variant="subtle" fontSize="xs">
                    {metric.comparison}
                  </Badge>
                )}
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {/* Progress towards goals */}
        <Box
          bg="rgba(255, 255, 255, 0.1)"
          borderRadius="lg"
          p={4}
        >
          <Text fontWeight="bold" mb={4} textAlign="center">
            🎯 Progress Towards Environmental Goals
          </Text>
          <VStack spacing={3}>
            <Box w="full">
              <Flex justify="space-between" mb={1}>
                <Text fontSize="sm">Carbon Neutrality (1 ton CO₂)</Text>
                <Text fontSize="sm">{Math.round((impactMetrics.find(m => m.id === 'carbon-offset')?.value || 0) / 1000 * 100)}%</Text>
              </Flex>
              <Progress
                value={Math.min((impactMetrics.find(m => m.id === 'carbon-offset')?.value || 0) / 1000 * 100, 100)}
                colorScheme="blue"
                borderRadius="full"
              />
            </Box>
            <Box w="full">
              <Flex justify="space-between" mb={1}>
                <Text fontSize="sm">Forest Restoration (10,000 trees)</Text>
                <Text fontSize="sm">{Math.round((impactMetrics.find(m => m.id === 'trees-planted')?.value || 0) / 10000 * 100)}%</Text>
              </Flex>
              <Progress
                value={Math.min((impactMetrics.find(m => m.id === 'trees-planted')?.value || 0) / 10000 * 100, 100)}
                colorScheme="green"
                borderRadius="full"
              />
            </Box>
            <Box w="full">
              <Flex justify="space-between" mb={1}>
                <Text fontSize="sm">Wildlife Sanctuary (100 species)</Text>
                <Text fontSize="sm">{Math.round((impactMetrics.find(m => m.id === 'wildlife-returned')?.value || 0) / 100 * 100)}%</Text>
              </Flex>
              <Progress
                value={Math.min((impactMetrics.find(m => m.id === 'wildlife-returned')?.value || 0) / 100 * 100, 100)}
                colorScheme="orange"
                borderRadius="full"
              />
            </Box>
          </VStack>
        </Box>

        {/* Educational Content */}
        <Box>
          <Text fontWeight="bold" mb={4} textAlign="center">
            📚 Learn About Environmental Impact
          </Text>
          <Accordion allowToggle>
            {EDUCATIONAL_CONTENT.map((content) => (
              <AccordionItem key={content.id} border="none" mb={2}>
                <AccordionButton
                  bg="rgba(255, 255, 255, 0.1)"
                  borderRadius="lg"
                  _hover={{ bg: "rgba(255, 255, 255, 0.15)" }}
                  _expanded={{ bg: "rgba(255, 255, 255, 0.2)" }}
                  onClick={() => { setSelectedContent(content); onOpen(); }}
                >
                  <HStack spacing={3} flex={1} textAlign="left">
                    <Text fontSize="xl">{content.icon}</Text>
                    <Text fontWeight="bold">{content.title}</Text>
                  </HStack>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel
                  bg="rgba(255, 255, 255, 0.05)"
                  borderRadius="lg"
                  mt={2}
                >
                  <Text fontSize="sm" lineHeight="tall">
                    {content.content}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>

        {/* Impact Summary */}
        <Box
          bg="rgba(255, 255, 255, 0.1)"
          borderRadius="lg"
          p={4}
          textAlign="center"
        >
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            🌟 Your Impact Summary
          </Text>
          <Text fontSize="sm" opacity={0.8} mb={3}>
            Every tree you plant makes a real difference in the fight against climate change and biodiversity loss.
          </Text>
          <SimpleGrid columns={2} spacing={4}>
            <Box>
              <Text fontSize="xs" opacity={0.8}>Equivalent to</Text>
              <Text fontSize="lg" fontWeight="bold" color="green.300">
                {Math.round((impactMetrics.find(m => m.id === 'carbon-offset')?.value || 0) / 22)} trees
              </Text>
            </Box>
            <Box>
              <Text fontSize="xs" opacity={0.8}>Carbon footprint offset</Text>
              <Text fontSize="lg" fontWeight="bold" color="blue.300">
                {Math.round((impactMetrics.find(m => m.id === 'carbon-offset')?.value || 0) / 5000 * 100)}%
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </VStack>

      {/* Educational Content Modal */}
      <Modal isOpen={isOpen} onClose={() => { setSelectedContent(null); onClose(); }} size="lg">
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>
            <HStack spacing={3}>
              <Text fontSize="2xl">{selectedContent?.icon}</Text>
              <Text>{selectedContent?.title}</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedContent && (
              <VStack spacing={4} align="stretch">
                <Text fontSize="lg" lineHeight="tall">
                  {selectedContent.content}
                </Text>
                <Box
                  bg="green.600"
                  p={3}
                  borderRadius="md"
                  textAlign="center"
                  animation={`${pulseAnimation} 2s ease-in-out infinite`}
                >
                  <Text fontWeight="bold">💡 Did you know?</Text>
                  <Text fontSize="sm">
                    Your tree planting contributions directly support these environmental benefits!
                  </Text>
                </Box>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
} 