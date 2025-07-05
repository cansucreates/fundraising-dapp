"use client";
import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
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
  Progress,
  IconButton,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { getGameInstance } from '@/utils/gameLogic';

// Animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
`;

const pulseAnimation = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
`;

const flowAnimation = keyframes`
  0% { transform: translateX(-100px) translateY(0px); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100px) translateY(-50px); opacity: 0; }
`;

interface CarbonProcess {
  id: string;
  name: string;
  description: string;
  icon: string;
  value: number;
  unit: string;
  color: string;
  comparison: string;
}

const CARBON_PROCESSES: CarbonProcess[] = [
  {
    id: 'co2-absorbed',
    name: 'CO₂ Absorbed',
    description: 'Carbon dioxide absorbed through photosynthesis',
    icon: '🌬️',
    value: 0,
    unit: 'kg CO₂',
    color: 'red.400',
    comparison: 'Equivalent to driving 1,000 km',
  },
  {
    id: 'oxygen-produced',
    name: 'Oxygen Produced',
    description: 'Oxygen released during photosynthesis',
    icon: '💨',
    value: 0,
    unit: 'kg O₂',
    color: 'cyan.400',
    comparison: 'Enough for 50 people for a year',
  },
  {
    id: 'carbon-stored',
    name: 'Carbon Stored',
    description: 'Carbon stored in tree biomass and soil',
    icon: '🌱',
    value: 0,
    unit: 'kg C',
    color: 'green.500',
    comparison: 'Equivalent to 3.67 kg CO₂',
  },
  {
    id: 'atmospheric-reduction',
    name: 'Atmospheric Reduction',
    description: 'Net reduction in atmospheric CO₂',
    icon: '🌍',
    value: 0,
    unit: 'kg CO₂',
    color: 'blue.400',
    comparison: 'Cooling effect on global climate',
  },
];

export default function CarbonOffsetIllustration() {
  const [processes, setProcesses] = useState<CarbonProcess[]>(CARBON_PROCESSES);
  const [selectedProcess, setSelectedProcess] = useState<CarbonProcess | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showComparison, setShowComparison] = useState(false);

  // Update carbon processes based on game state
  useEffect(() => {
    const game = getGameInstance();
    const impact = game.calculateEnvironmentalImpact();

    const updatedProcesses = CARBON_PROCESSES.map(process => {
      let value = 0;
      switch (process.id) {
        case 'co2-absorbed':
          value = impact.carbonOffset;
          break;
        case 'oxygen-produced':
          value = impact.treesPlanted * 118; // kg O2 per tree per year
          break;
        case 'carbon-stored':
          value = impact.carbonOffset * 0.27; // 27% of CO2 becomes stored carbon
          break;
        case 'atmospheric-reduction':
          value = impact.carbonOffset * 0.73; // 73% reduces atmospheric CO2
          break;
      }
      return { ...process, value };
    });

    setProcesses(updatedProcesses);
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

  const handleProcessClick = (process: CarbonProcess) => {
    setSelectedProcess(process);
    onOpen();
  };

  return (
    <Box
      position="relative"
      borderRadius="xl"
      overflow="hidden"
      color="white"
      minH="600px"
    >
      {/* Background Image */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgImage="url('/campaign/gameinterfacer.jpg')"
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
            <Text fontSize="3xl" fontWeight="bold" mb={2}>
              🌳 Carbon Offset Process Illustration
            </Text>
            <Text fontSize="lg" opacity={0.8}>
              Visual representation of how trees combat climate change
            </Text>
          </Box>

          {/* Main Illustration */}
          <Box
            bg="rgba(255, 255, 255, 0.1)"
            borderRadius="xl"
            p={8}
            position="relative"
            minH="400px"
            overflow="hidden"
          >
            {/* Central Tree */}
            <Box
              position="absolute"
              left="50%"
              top="50%"
              transform="translate(-50%, -50%)"
              fontSize="8xl"
              animation={`${floatAnimation} 4s ease-in-out infinite`}
              zIndex={10}
            >
              🌳
            </Box>

            {/* CO2 Particles (Gray) */}
            <Box
              position="absolute"
              left="10%"
              top="20%"
              fontSize="2xl"
              animation={`${flowAnimation} 3s ease-in-out infinite`}
              style={{ animationDelay: '0s' }}
            >
              💨
            </Box>
            <Box
              position="absolute"
              left="15%"
              top="30%"
              fontSize="xl"
              animation={`${flowAnimation} 3s ease-in-out infinite`}
              style={{ animationDelay: '0.5s' }}
            >
              💨
            </Box>
            <Box
              position="absolute"
              left="20%"
              top="25%"
              fontSize="lg"
              animation={`${flowAnimation} 3s ease-in-out infinite`}
              style={{ animationDelay: '1s' }}
            >
              💨
            </Box>

            {/* Oxygen Particles (Green/Blue) */}
            <Box
              position="absolute"
              right="15%"
              top="15%"
              fontSize="2xl"
              color="cyan.300"
              animation={`${flowAnimation} 2.5s ease-in-out infinite reverse`}
              style={{ animationDelay: '0.2s' }}
            >
              💨
            </Box>
            <Box
              position="absolute"
              right="20%"
              top="25%"
              fontSize="xl"
              color="cyan.300"
              animation={`${flowAnimation} 2.5s ease-in-out infinite reverse`}
              style={{ animationDelay: '0.7s' }}
            >
              💨
            </Box>

            {/* Carbon Storage in Soil */}
            <Box
              position="absolute"
              bottom="10%"
              left="45%"
              fontSize="3xl"
              animation={`${pulseAnimation} 3s ease-in-out infinite`}
            >
              🌱
            </Box>

            {/* Measurement Tools */}
            <Box
              position="absolute"
              top="10%"
              right="10%"
              bg="rgba(0, 0, 0, 0.6)"
              p={3}
              borderRadius="lg"
              fontSize="sm"
              textAlign="center"
            >
              <Text fontWeight="bold">📊 CO₂ Monitor</Text>
              <Text fontSize="xs" opacity={0.8}>
                {formatValue(processes.find(p => p.id === 'co2-absorbed')?.value || 0, 'kg CO₂')}
              </Text>
            </Box>

            {/* Atmospheric CO₂ Level */}
            <Box
              position="absolute"
              top="10%"
              left="10%"
              bg="rgba(0, 0, 0, 0.6)"
              p={3}
              borderRadius="lg"
              fontSize="sm"
              textAlign="center"
            >
              <Text fontWeight="bold">🌍 Atmosphere</Text>
              <Text fontSize="xs" opacity={0.8}>
                -{formatValue(processes.find(p => p.id === 'atmospheric-reduction')?.value || 0, 'kg CO₂')}
              </Text>
            </Box>

            {/* Labels */}
            <Box
              position="absolute"
              left="5%"
              top="50%"
              transform="translateY(-50%)"
              textAlign="center"
              fontSize="sm"
            >
              <Text fontWeight="bold" mb={1}>CO₂ Input</Text>
              <Text fontSize="xs" opacity={0.8}>Gray particles</Text>
            </Box>

            <Box
              position="absolute"
              right="5%"
              top="50%"
              transform="translateY(-50%)"
              textAlign="center"
              fontSize="sm"
            >
              <Text fontWeight="bold" mb={1}>O₂ Output</Text>
              <Text fontSize="xs" opacity={0.8}>Green/Blue particles</Text>
            </Box>

            <Box
              position="absolute"
              bottom="5%"
              left="50%"
              transform="translateX(-50%)"
              textAlign="center"
              fontSize="sm"
            >
              <Text fontWeight="bold" mb={1}>Carbon Storage</Text>
              <Text fontSize="xs" opacity={0.8}>Soil & biomass</Text>
            </Box>
          </Box>

          {/* Carbon Process Metrics */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
            {processes.map((process) => (
              <Box
                key={process.id}
                bg="rgba(255, 255, 255, 0.1)"
                borderRadius="lg"
                p={4}
                cursor="pointer"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.15)",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.2s"
                onClick={() => handleProcessClick(process)}
              >
                <VStack spacing={3} textAlign="center">
                  <Text fontSize="3xl">{process.icon}</Text>
                  <Text fontSize="lg" fontWeight="bold">
                    {formatValue(process.value, process.unit)}
                  </Text>
                  <Text fontSize="sm" fontWeight="bold">
                    {process.name}
                  </Text>
                  <Text fontSize="xs" opacity={0.8} textAlign="center">
                    {process.description}
                  </Text>
                  <Badge colorScheme="green" variant="subtle" fontSize="xs">
                    {process.comparison}
                  </Badge>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>

          {/* Comparison Section */}
          <Box
            bg="rgba(255, 255, 255, 0.1)"
            borderRadius="lg"
            p={6}
          >
            <Flex justify="space-between" align="center" mb={4}>
              <Text fontSize="xl" fontWeight="bold">
                🔄 Traditional vs. Forest-Based Carbon Solutions
              </Text>
              <IconButton
                aria-label="Toggle comparison"
                icon={<ExternalLinkIcon />}
                size="sm"
                onClick={() => setShowComparison(!showComparison)}
              />
            </Flex>

            {showComparison && (
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <Box>
                  <Text fontWeight="bold" mb={3} color="red.300">
                    ❌ Traditional Solutions
                  </Text>
                  <VStack spacing={2} align="stretch">
                    <Box fontSize="sm">
                      • Carbon capture technology (expensive)
                    </Box>
                    <Box fontSize="sm">
                      • Industrial processes (high energy)
                    </Box>
                    <Box fontSize="sm">
                      • Limited scalability
                    </Box>
                    <Box fontSize="sm">
                      • High maintenance costs
                    </Box>
                  </VStack>
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={3} color="green.300">
                    ✅ Forest-Based Solutions
                  </Text>
                  <VStack spacing={2} align="stretch">
                    <Box fontSize="sm">
                      • Natural photosynthesis (free)
                    </Box>
                    <Box fontSize="sm">
                      • Renewable and sustainable
                    </Box>
                    <Box fontSize="sm">
                      • Scalable globally
                    </Box>
                    <Box fontSize="sm">
                      • Additional ecosystem benefits
                    </Box>
                  </VStack>
                </Box>
              </SimpleGrid>
            )}
          </Box>

          {/* Educational Summary */}
          <Box
            bg="rgba(255, 255, 255, 0.1)"
            borderRadius="lg"
            p={4}
            textAlign="center"
          >
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              🎓 How Carbon Offset Works
            </Text>
            <Text fontSize="sm" opacity={0.8} mb={3}>
              Trees absorb CO₂ through photosynthesis, converting it into oxygen and storing carbon in their biomass and soil. 
              This natural process helps reduce atmospheric CO₂ levels and combat climate change.
            </Text>
            <Progress
              value={Math.min((processes.find(p => p.id === 'co2-absorbed')?.value || 0) / 1000 * 100, 100)}
              colorScheme="green"
              borderRadius="full"
              size="lg"
            />
            <Text fontSize="xs" mt={2} opacity={0.8}>
              Progress towards 1 ton CO₂ offset: {Math.round((processes.find(p => p.id === 'co2-absorbed')?.value || 0) / 1000 * 100)}%
            </Text>
          </Box>
        </VStack>

        {/* Process Detail Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent bg="gray.800" color="white">
            <ModalHeader>
              <HStack spacing={3}>
                <Text fontSize="2xl">{selectedProcess?.icon}</Text>
                <Text>{selectedProcess?.name}</Text>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {selectedProcess && (
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text fontSize="lg" lineHeight="tall">
                      {selectedProcess.description}
                    </Text>
                  </Box>
                  <Box
                    bg="rgba(255, 255, 255, 0.1)"
                    p={4}
                    borderRadius="md"
                    textAlign="center"
                  >
                    <Text fontSize="2xl" fontWeight="bold" color={selectedProcess.color}>
                      {formatValue(selectedProcess.value, selectedProcess.unit)}
                    </Text>
                    <Text fontSize="sm" opacity={0.8}>
                      {selectedProcess.comparison}
                    </Text>
                  </Box>
                  <Box
                    bg="green.600"
                    p={3}
                    borderRadius="md"
                    textAlign="center"
                    animation={`${pulseAnimation} 2s ease-in-out infinite`}
                  >
                    <Text fontWeight="bold">💡 Scientific Fact</Text>
                    <Text fontSize="sm">
                      This process is part of the natural carbon cycle that has maintained Earth&apos;s climate for millions of years.
                    </Text>
                  </Box>
                </VStack>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
} 