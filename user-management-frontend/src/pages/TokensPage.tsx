import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  useToast,
  Badge,
  Code,
  IconButton,
  Tooltip,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { CopyIcon, CheckIcon, AddIcon, LockIcon } from '@chakra-ui/icons';
import { useAuth } from '../contexts/AuthContext';

interface TokenInfo {
  token: string;
  expiresIn: string;
  createdAt: string;
}

const TokensPage: React.FC = () => {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedToken, setGeneratedToken] = useState<TokenInfo | null>(null);
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const handleGenerateToken = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/auth/generate-my-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar token');
      }

      const data = await response.json();
      setGeneratedToken({
        token: data.token,
        expiresIn: data.expiresIn || '24 horas',
        createdAt: new Date().toLocaleString('pt-BR'),
      });

      toast({
        title: 'Token gerado com sucesso!',
        description: 'Seu novo token foi criado e está pronto para uso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro ao gerar token',
        description: 'Não foi possível gerar o token. Tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToken = async () => {
    if (!generatedToken) return;

    try {
      await navigator.clipboard.writeText(generatedToken.token);
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
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="lg" color="blue.600" mb={2}>
            <HStack>
              <LockIcon />
              <Text>Gerenciamento de Tokens</Text>
            </HStack>
          </Heading>
          <Text color="gray.600">
            Gerencie seus tokens de acesso à API
          </Text>
        </Box>

        {/* User Info */}
        <Card>
          <CardBody>
            <HStack justify="space-between">
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold">{user?.name}</Text>
                <Text fontSize="sm" color="gray.600">{user?.email}</Text>
                <Badge colorScheme={user?.roles.includes('ADMIN') ? 'purple' : 'blue'}>
                  {user?.roles.includes('ADMIN') ? 'Administrador' : 'Usuário'}
                </Badge>
              </VStack>
            </HStack>
          </CardBody>
        </Card>

        {/* Generate Token Section */}
        <Card>
          <CardHeader>
            <Heading size="md">Gerar Novo Token</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Alert status="info">
                <AlertIcon />
                <Box>
                  <AlertTitle>Como funciona:</AlertTitle>
                  <AlertDescription>
                    Gere um token JWT para acessar a API. O token expira em 24 horas e pode ser usado para autenticação em requisições.
                  </AlertDescription>
                </Box>
              </Alert>

              <Button
                leftIcon={<AddIcon />}
                colorScheme="blue"
                onClick={handleGenerateToken}
                isLoading={isGenerating}
                loadingText="Gerando token..."
                size="lg"
              >
                Gerar Novo Token
              </Button>
            </VStack>
          </CardBody>
        </Card>

        {/* Generated Token Display */}
        {generatedToken && (
          <Card borderColor="green.200" borderWidth="2px">
            <CardHeader>
              <HStack>
                <Heading size="md" color="green.600">Token Gerado</Heading>
                <Badge colorScheme="green">Novo</Badge>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Text fontWeight="bold">Token JWT:</Text>
                  <Tooltip label={copied ? 'Copiado!' : 'Copiar token'}>
                    <IconButton
                      aria-label="Copiar token"
                      icon={copied ? <CheckIcon /> : <CopyIcon />}
                      colorScheme={copied ? 'green' : 'blue'}
                      variant="outline"
                      size="sm"
                      onClick={handleCopyToken}
                    />
                  </Tooltip>
                </HStack>

                <Code
                  p={3}
                  borderRadius="md"
                  fontSize="xs"
                  wordBreak="break-all"
                  bg="gray.50"
                  border="1px solid"
                  borderColor="gray.200"
                >
                  {generatedToken.token}
                </Code>

                <Divider />

                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.600">
                    <strong>Expira em:</strong> {generatedToken.expiresIn}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    <strong>Criado em:</strong> {generatedToken.createdAt}
                  </Text>
                </HStack>

                <Alert status="warning">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Importante:</AlertTitle>
                    <AlertDescription>
                      Guarde este token em local seguro. Ele não será exibido novamente e expira em 24 horas.
                    </AlertDescription>
                  </Box>
                </Alert>

                <VStack align="stretch" spacing={2}>
                  <Text fontWeight="bold">Como usar:</Text>
                  <Text fontSize="sm" color="gray.600">
                    1. Copie o token acima
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    2. Use no header: <Code>Authorization: Bearer {'{token}'}</Code>
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    3. Exemplo de requisição:
                  </Text>
                  <Code p={2} fontSize="xs" bg="gray.100">
                    curl -H "Authorization: Bearer {generatedToken.token.substring(0, 20)}..." http://localhost:8080/api/users
                  </Code>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* API Documentation */}
        <Card>
          <CardHeader>
            <Heading size="md">Documentação da API</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              <Text fontWeight="bold">Endpoints disponíveis:</Text>
              
              <Box>
                <Text fontSize="sm" fontWeight="semibold">GET /api/users</Text>
                <Text fontSize="xs" color="gray.600">Listar todos os usuários</Text>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="semibold">GET /api/users/{'{id}'}</Text>
                <Text fontSize="xs" color="gray.600">Buscar usuário por ID</Text>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="semibold">POST /api/users</Text>
                <Text fontSize="xs" color="gray.600">Criar novo usuário (apenas ADMIN)</Text>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="semibold">PUT /api/users/{'{id}'}</Text>
                <Text fontSize="xs" color="gray.600">Atualizar usuário</Text>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="semibold">DELETE /api/users/{'{id}'}</Text>
                <Text fontSize="xs" color="gray.600">Deletar usuário (apenas ADMIN)</Text>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="semibold">GET /api/users/stats</Text>
                <Text fontSize="xs" color="gray.600">Estatísticas dos usuários</Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default TokensPage;
