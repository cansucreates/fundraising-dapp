"use client";

import { Box, Container, Flex, Link, HStack, Text, Badge } from "@chakra-ui/react";
import { isDevnetEnvironment } from "@/lib/contract-utils";
import { useDevnetWallet } from "@/lib/devnet-wallet-context";
import { DevnetWalletButton } from "./DevnetWalletButton";
import { ConnectWalletButton } from "./ConnectWallet";

export const Navbar = () => {
  const { currentWallet, wallets, setCurrentWallet } = useDevnetWallet();

  return (
    <Box 
      as="nav" 
      position="relative"
      overflow="hidden"
      boxShadow="lg"
    >
      {/* Background Image */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgImage="url('/campaign/cryptoeffect.jpg')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        filter="brightness(0.2)"
      />
      {/* Overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="linear-gradient(135deg, rgba(45, 90, 39, 0.95) 0%, rgba(139, 69, 19, 0.95) 100%)"
      />
      {/* Content */}
      <Box position="relative">
        <Container maxW="container.xl">
          <Flex justify="space-between" h={16} align="center">
            <Flex align="center">
              <Flex
                bg="white"
                borderRadius="lg"
                border="2px"
                borderColor="green.600"
                letterSpacing="-.05em"
                fontSize="xl"
                fontWeight="bold"
                w="52px"
                h="52px"
                justify="center"
                align="center"
                color="green.600"
                shrink="0"
                boxShadow="md"
              >
                🌳
              </Flex>
              <Link href="/" textDecoration="none">
                <HStack spacing={2} ml={4}>
                  <Box fontSize="lg" fontWeight="bold" color="white">
                    Forest Revival
                  </Box>
                  <Badge colorScheme="green" variant="solid" fontSize="xs">
                    Initiative
                  </Badge>
                </HStack>
              </Link>
            </Flex>
            <Flex align="center" gap={4}>
              <HStack spacing={2} color="white" fontSize="sm">
                <Text>🌱 Plant Trees</Text>
                <Text>🌍 Track Impact</Text>
                <Text>🦌 Save Wildlife</Text>
              </HStack>
              {isDevnetEnvironment() ? (
                <DevnetWalletButton
                  currentWallet={currentWallet}
                  wallets={wallets}
                  onWalletSelect={setCurrentWallet}
                />
              ) : (
                <ConnectWalletButton />
              )}
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};
