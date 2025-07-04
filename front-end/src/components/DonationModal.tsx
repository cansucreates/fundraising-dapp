import { useExistingDonation } from "@/hooks/campaignQueries";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  NumberInput,
  NumberInputField,
  useToast,
  HStack,
  VStack,
  RadioGroup,
  Radio,
  ModalFooter,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useContext } from "react";
import HiroWalletContext from "./HiroWalletProvider";
import {
  executeContractCall,
  isDevnetEnvironment,
  isTestnetEnvironment,
  openContractCall,
} from "@/lib/contract-utils";
import { useDevnetWallet } from "@/lib/devnet-wallet-context";
import { ConnectWalletButton } from "./ConnectWallet";
import { DevnetWalletButton } from "./DevnetWalletButton";
import { getContributeSbtcTx, getContributeStxTx } from "@/lib/campaign-utils";
import { getStacksNetworkString } from "@/lib/stacks-api";
import {
  btcToSats,
  satsToSbtc,
  stxToUstx,
  usdToSbtc,
  usdToStx,
  useCurrentPrices,
  ustxToStx,
} from "@/lib/currency-utils";

export default function DonationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => undefined;
}) {
  const { mainnetAddress, testnetAddress } = useContext(HiroWalletContext);
  const {
    currentWallet: devnetWallet,
    wallets: devnetWallets,
    setCurrentWallet: setDevnetWallet,
  } = useDevnetWallet();
  const currentWalletAddress = isDevnetEnvironment()
    ? devnetWallet?.stxAddress
    : isTestnetEnvironment()
    ? testnetAddress
    : mainnetAddress;

  const { data: previousDonation } = useExistingDonation(currentWalletAddress);
  const { data: prices } = useCurrentPrices();

  const hasMadePreviousDonation =
    previousDonation &&
    (previousDonation?.stxAmount > 0 || previousDonation?.sbtcAmount > 0);

  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stx");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const toast = useToast();

  const presetAmounts = [10, 25, 50, 100];

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const calculateEnvironmentalImpact = (amount: number) => {
    const treesPlanted = Math.floor(amount * 10); // $1 = 10 trees
    const carbonOffset = treesPlanted * 22; // 22kg CO2 per tree per year
    const forestArea = treesPlanted * 25; // 25 sq meters per tree
    const oxygenProduced = treesPlanted * 118; // kg of oxygen per year
    
    return {
      treesPlanted,
      carbonOffset,
      forestArea,
      oxygenProduced,
    };
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const amount = selectedAmount || Number(customAmount);

    if (!amount || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid donation amount",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Handle donation
    try {
      const txOptions =
        paymentMethod === "sbtc"
          ? getContributeSbtcTx(getStacksNetworkString(), {
              address: currentWalletAddress || "",
              amount: Math.round(
                btcToSats(usdToSbtc(amount, prices?.sbtc || 0))
              ),
            })
          : getContributeStxTx(getStacksNetworkString(), {
              address: currentWalletAddress || "",
              amount: Math.round(
                Number(stxToUstx(usdToStx(amount, prices?.stx || 0)))
              ),
            });

      const impact = calculateEnvironmentalImpact(amount);

      const doSuccessToast = (txid: string) => {
        toast({
          title: "🌳 Thank you for planting trees!",
          description: (
            <VStack spacing={3} align="stretch">
              <Box>
                <Text fontWeight="bold" color="green.600">
                  Your donation of ${amount} will plant {impact.treesPlanted} trees!
                </Text>
              </Box>
              <SimpleGrid columns={2} spacing={2}>
                <Box textAlign="center">
                  <Text fontSize="sm" color="blue.600" fontWeight="bold">
                    {impact.carbonOffset.toLocaleString()} kg CO₂
                  </Text>
                  <Text fontSize="xs">Carbon offset per year</Text>
                </Box>
                <Box textAlign="center">
                  <Text fontSize="sm" color="green.600" fontWeight="bold">
                    {impact.forestArea.toLocaleString()} m²
                  </Text>
                  <Text fontSize="xs">Forest area restored</Text>
                </Box>
              </SimpleGrid>
              <Box fontSize="xs" color="gray.600">
                Transaction ID: <strong>{txid}</strong>
              </Box>
            </VStack>
          ),
          status: "success",
          isClosable: true,
          duration: 30000,
        });
      };

      // Devnet uses direct call, Testnet/Mainnet needs to prompt with browser extension
      if (isDevnetEnvironment()) {
        const { txid } = await executeContractCall(txOptions, devnetWallet);
        doSuccessToast(txid);
      } else {
        await openContractCall({
          ...txOptions,
          onFinish: (data) => {
            doSuccessToast(data.txId);
          },
          onCancel: () => {
            toast({
              title: "Cancelled",
              description: "Tree planting was cancelled",
              status: "info",
              duration: 3000,
            });
          },
        });
      }
      setCustomAmount("");
      setSelectedAmount(null);
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "Failed to plant trees",
        status: "error",
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack spacing={3}>
            <Text fontSize="2xl">🌳</Text>
            <Text>Plant Trees & Restore Forests</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="8">
          <Flex direction="column" gap="3">
            {!currentWalletAddress ? (
              <Flex
                p={6}
                borderWidth="1px"
                borderRadius="lg"
                align="center"
                justify="center"
                direction="column"
                gap="4"
              >
                <Box textAlign="center">
                  <Text fontSize="lg" fontWeight="bold" mb={2}>
                    🌱 Connect Your Wallet to Plant Trees
                  </Text>
                  <Text color="gray.600">
                    Connect your STX wallet to contribute to forest restoration and play our interactive tree planting game.
                  </Text>
                </Box>
                {isDevnetEnvironment() ? (
                  <DevnetWalletButton
                    currentWallet={devnetWallet}
                    wallets={devnetWallets}
                    onWalletSelect={setDevnetWallet}
                  />
                ) : (
                  <ConnectWalletButton />
                )}
              </Flex>
            ) : (
              <VStack spacing={6}>
                {/* Environmental Impact Preview */}
                <Box
                  bg="green.50"
                  p={4}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor="green.200"
                  w="full"
                >
                  <Text fontWeight="bold" color="green.700" mb={2}>
                    🌍 Your Impact Preview
                  </Text>
                  <Text fontSize="sm" color="green.600">
                    Every $1 donated plants 10 trees and offsets 220kg of CO₂ annually.
                    Your contribution directly supports forest restoration projects worldwide.
                  </Text>
                </Box>

                {/* Payment Method Selection */}
                <Box w="full">
                  <Text fontWeight="bold" mb={3}>
                    Choose Payment Method
                  </Text>
                  <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                    <VStack spacing={3} align="stretch">
                      <Radio value="stx" colorScheme="green">
                        <HStack spacing={2}>
                          <Text>🌳 STX (Stacks)</Text>
                          <Badge colorScheme="green" variant="subtle">
                            Recommended
                          </Badge>
                        </HStack>
                      </Radio>
                      <Radio value="sbtc" colorScheme="green">
                        <Text>₿ sBTC (Bitcoin)</Text>
                      </Radio>
                    </VStack>
                  </RadioGroup>
                </Box>

                {/* Amount Selection */}
                <Box w="full">
                  <Text fontWeight="bold" mb={3}>
                    Select Donation Amount
                  </Text>
                  <VStack spacing={3}>
                    <SimpleGrid columns={2} spacing={3} w="full">
                      {presetAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant={selectedAmount === amount ? "solid" : "outline"}
                          colorScheme="green"
                          onClick={() => handlePresetClick(amount)}
                          h="auto"
                          p={4}
                        >
                          <VStack spacing={1}>
                            <Text fontWeight="bold">${amount}</Text>
                            <Text fontSize="xs" opacity={0.8}>
                              {amount * 10} trees
                            </Text>
                          </VStack>
                        </Button>
                      ))}
                    </SimpleGrid>
                    <Box w="full">
                      <Text fontSize="sm" mb={2}>
                        Or enter custom amount:
                      </Text>
                      <NumberInput
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        min={1}
                        max={10000}
                      >
                        <NumberInputField
                          placeholder="Enter amount in USD"
                          borderRadius="lg"
                        />
                      </NumberInput>
                      {customAmount && (
                        <Text fontSize="xs" color="green.600" mt={1}>
                          Will plant {Math.floor(Number(customAmount) * 10)} trees
                        </Text>
                      )}
                    </Box>
                  </VStack>
                </Box>

                {/* Impact Summary */}
                {(selectedAmount || customAmount) && (
                  <Box
                    bg="blue.50"
                    p={4}
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor="blue.200"
                    w="full"
                  >
                    <Text fontWeight="bold" color="blue.700" mb={3}>
                      🌿 Your Contribution Impact
                    </Text>
                    {(() => {
                      const amount = selectedAmount || Number(customAmount);
                      const impact = calculateEnvironmentalImpact(amount);
                      return (
                        <SimpleGrid columns={2} spacing={4}>
                          <Box textAlign="center">
                            <Text fontSize="lg" fontWeight="bold" color="green.600">
                              {impact.treesPlanted}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              Trees Planted
                            </Text>
                          </Box>
                          <Box textAlign="center">
                            <Text fontSize="lg" fontWeight="bold" color="blue.600">
                              {impact.carbonOffset.toLocaleString()} kg
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              CO₂ Offset/Year
                            </Text>
                          </Box>
                          <Box textAlign="center">
                            <Text fontSize="lg" fontWeight="bold" color="green.600">
                              {impact.forestArea.toLocaleString()} m²
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              Forest Area
                            </Text>
                          </Box>
                          <Box textAlign="center">
                            <Text fontSize="lg" fontWeight="bold" color="cyan.600">
                              {impact.oxygenProduced.toLocaleString()} kg
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              Oxygen/Year
                            </Text>
                          </Box>
                        </SimpleGrid>
                      );
                    })()}
                  </Box>
                )}

                {/* Previous Donation Info */}
                {hasMadePreviousDonation && (
                  <Alert status="info">
                    <Box>
                      <AlertTitle>🌳 You&apos;ve already contributed to forest restoration!</AlertTitle>
                      <AlertDescription>
                        <Box>
                          Previous STX:{" "}
                          {Number(
                            ustxToStx(previousDonation?.stxAmount)
                          ).toFixed(2)}
                        </Box>
                        <Box>
                          Previous sBTC:{" "}
                          {satsToSbtc(previousDonation?.sbtcAmount).toFixed(8)}
                        </Box>
                      </AlertDescription>
                    </Box>
                  </Alert>
                )}
                  </VStack>
            )}
          </Flex>
        </ModalBody>
        <ModalFooter>
          {currentWalletAddress && (
            <Button
              colorScheme="green"
              size="lg"
              onClick={handleSubmit}
              isLoading={isLoading}
              loadingText="Planting Trees..."
              leftIcon={<Text fontSize="xl">🌳</Text>}
              w="full"
            >
              Plant Trees Now
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
