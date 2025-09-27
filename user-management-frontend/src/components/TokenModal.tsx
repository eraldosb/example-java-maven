import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Text,
  Code,
  useToast,
  HStack,
  IconButton,
  Tooltip,
  Badge,
} from '@chakra-ui/react';
import { CopyIcon, CheckIcon } from '@chakra-ui/icons';

interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  userEmail: string;
}

const TokenModal: React.FC<TokenModalProps> = ({ isOpen, onClose, token, userEmail }) => {
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const handleCopyToken = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      toast({
        title: 'Token copiado!',
        description: 'Token copiado para a área de transferência',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: 'Erro ao copiar',
        description: 'Não foi possível copiar o token',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Text>Token Gerado</Text>
            <Badge colorScheme="green">Novo</Badge>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text fontSize="sm" color="gray.600">
              Token gerado para: <strong>{userEmail}</strong>
            </Text>
            
            <VStack spacing={2} align="stretch">
              <Text fontSize="sm" fontWeight="bold">
                Token JWT:
              </Text>
              <Code
                p={3}
                borderRadius="md"
                fontSize="xs"
                wordBreak="break-all"
                bg="gray.50"
                border="1px solid"
                borderColor="gray.200"
              >
                {token}
              </Code>
            </VStack>

            <VStack spacing={2} align="stretch">
              <Text fontSize="sm" fontWeight="bold">
                Como usar:
              </Text>
              <Text fontSize="sm" color="gray.600">
                1. Copie o token acima
              </Text>
              <Text fontSize="sm" color="gray.600">
                2. Use no header Authorization: Bearer {'{token}'}
              </Text>
              <Text fontSize="sm" color="gray.600">
                3. O token expira em 24 horas
              </Text>
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={2}>
            <Tooltip label={copied ? 'Copiado!' : 'Copiar token'}>
              <IconButton
                aria-label="Copiar token"
                icon={copied ? <CheckIcon /> : <CopyIcon />}
                colorScheme={copied ? 'green' : 'blue'}
                variant="outline"
                onClick={handleCopyToken}
              />
            </Tooltip>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Fechar
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TokenModal;
