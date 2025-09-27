import React from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Icon,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react'
import { RepeatIcon, CheckIcon, WarningIcon, InfoIcon } from '@chakra-ui/icons'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface HealthStatus {
  status: 'UP' | 'DOWN'
  timestamp: string
  database: {
    status: 'UP' | 'DOWN'
    message: string
  }
  system: {
    javaVersion: string
    osName: string
    osVersion: string
    availableProcessors: number
    totalMemory: number
    freeMemory: number
    maxMemory: number
  }
  application: {
    status: 'UP' | 'DOWN'
    totalUsers: number
    activeUsers: number
    inactiveUsers: number
  }
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api'

const fetchHealthStatus = async (): Promise<HealthStatus> => {
  const response = await axios.get(`${API_BASE_URL}/health`)
  return response.data
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const StatusBadge: React.FC<{ status: 'UP' | 'DOWN' }> = ({ status }) => {
  const colorScheme = status === 'UP' ? 'green' : 'red'
  const icon = status === 'UP' ? CheckIcon : WarningIcon
  
  return (
    <Badge colorScheme={colorScheme} variant="subtle" px={3} py={1} borderRadius="full">
      <HStack spacing={1}>
        <Icon as={icon} boxSize={3} />
        <Text fontSize="sm" fontWeight="medium">
          {status === 'UP' ? 'Operacional' : 'Indisponível'}
        </Text>
      </HStack>
    </Badge>
  )
}

export const StatusPage: React.FC = () => {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const {
    data: healthStatus,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['health-status'],
    queryFn: fetchHealthStatus,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  })

  if (error) {
    return (
      <VStack spacing={6} align="stretch">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            Status do Sistema
          </Text>
          <Text color="gray.600">
            Monitoramento da saúde da aplicação
          </Text>
        </Box>

        <Alert status="error" borderRadius="lg">
          <AlertIcon />
          <Box>
            <AlertTitle>Erro ao carregar status!</AlertTitle>
            <AlertDescription>
              Não foi possível conectar com o servidor. Verifique se a aplicação está rodando.
            </AlertDescription>
          </Box>
        </Alert>

        <Button
          leftIcon={<RepeatIcon />}
          colorScheme="brand"
          onClick={() => refetch()}
          isLoading={isRefetching}
        >
          Tentar Novamente
        </Button>
      </VStack>
    )
  }

  return (
    <VStack spacing={6} align="stretch">
      {/* Header */}
      <HStack justify="space-between" align="center">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            Status do Sistema
          </Text>
          <Text color="gray.600">
            Monitoramento da saúde da aplicação
          </Text>
        </Box>
        <Button
          leftIcon={<RepeatIcon />}
          colorScheme="brand"
          onClick={() => refetch()}
          isLoading={isRefetching}
          size="sm"
        >
          Atualizar
        </Button>
      </HStack>

      {/* Overall Status */}
      <Card bg={cardBg} borderColor={borderColor}>
        <CardHeader>
          <HStack justify="space-between">
            <Heading size="md">Status Geral</Heading>
            {healthStatus && <StatusBadge status={healthStatus.status} />}
          </HStack>
        </CardHeader>
        <CardBody>
          {isLoading ? (
            <Skeleton height="60px" />
          ) : healthStatus ? (
            <VStack spacing={3} align="stretch">
              <HStack justify="space-between">
                <Text color="gray.600">Última atualização:</Text>
                <Text fontSize="sm" color="gray.500">
                  {new Date(healthStatus.timestamp).toLocaleString('pt-BR')}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text color="gray.600">Status da aplicação:</Text>
                <StatusBadge status={healthStatus.status} />
              </HStack>
            </VStack>
          ) : null}
        </CardBody>
      </Card>

      {/* System Components */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
        {/* Database Status */}
        <GridItem>
          <Card bg={cardBg} borderColor={borderColor}>
            <CardHeader>
              <HStack justify="space-between">
                <Heading size="sm">Banco de Dados</Heading>
                {healthStatus && <StatusBadge status={healthStatus.database.status} />}
              </HStack>
            </CardHeader>
            <CardBody>
              {isLoading ? (
                <Skeleton height="40px" />
              ) : healthStatus ? (
                <Text fontSize="sm" color="gray.600">
                  {healthStatus.database.message}
                </Text>
              ) : null}
            </CardBody>
          </Card>
        </GridItem>

        {/* Application Status */}
        <GridItem>
          <Card bg={cardBg} borderColor={borderColor}>
            <CardHeader>
              <HStack justify="space-between">
                <Heading size="sm">Aplicação</Heading>
                {healthStatus && <StatusBadge status={healthStatus.application.status} />}
              </HStack>
            </CardHeader>
            <CardBody>
              {isLoading ? (
                <Skeleton height="40px" />
              ) : healthStatus ? (
                <VStack spacing={2} align="stretch">
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">Total de usuários:</Text>
                    <Text fontSize="sm" fontWeight="medium">{healthStatus.application.totalUsers}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">Usuários ativos:</Text>
                    <Text fontSize="sm" fontWeight="medium" color="green.500">
                      {healthStatus.application.activeUsers}
                    </Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">Usuários inativos:</Text>
                    <Text fontSize="sm" fontWeight="medium" color="red.500">
                      {healthStatus.application.inactiveUsers}
                    </Text>
                  </HStack>
                </VStack>
              ) : null}
            </CardBody>
          </Card>
        </GridItem>

        {/* System Info */}
        <GridItem>
          <Card bg={cardBg} borderColor={borderColor}>
            <CardHeader>
              <HStack>
                <Icon as={InfoIcon} color="blue.500" />
                <Heading size="sm">Informações do Sistema</Heading>
              </HStack>
            </CardHeader>
            <CardBody>
              {isLoading ? (
                <Skeleton height="120px" />
              ) : healthStatus ? (
                <VStack spacing={2} align="stretch">
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">Java:</Text>
                    <Text fontSize="sm" fontWeight="medium">{healthStatus.system.javaVersion}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">OS:</Text>
                    <Text fontSize="sm" fontWeight="medium">
                      {healthStatus.system.osName} {healthStatus.system.osVersion}
                    </Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.600">Processadores:</Text>
                    <Text fontSize="sm" fontWeight="medium">{healthStatus.system.availableProcessors}</Text>
                  </HStack>
                </VStack>
              ) : null}
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      {/* Memory Usage */}
      {healthStatus && (
        <Card bg={cardBg} borderColor={borderColor}>
          <CardHeader>
            <Heading size="md">Uso de Memória</Heading>
          </CardHeader>
          <CardBody>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
              <GridItem>
                <Stat>
                  <StatLabel>Memória Total</StatLabel>
                  <StatNumber fontSize="lg" color="blue.500">
                    {formatBytes(healthStatus.system.totalMemory)}
                  </StatNumber>
                </Stat>
              </GridItem>
              <GridItem>
                <Stat>
                  <StatLabel>Memória Livre</StatLabel>
                  <StatNumber fontSize="lg" color="green.500">
                    {formatBytes(healthStatus.system.freeMemory)}
                  </StatNumber>
                </Stat>
              </GridItem>
              <GridItem>
                <Stat>
                  <StatLabel>Memória Máxima</StatLabel>
                  <StatNumber fontSize="lg" color="purple.500">
                    {formatBytes(healthStatus.system.maxMemory)}
                  </StatNumber>
                </Stat>
              </GridItem>
            </Grid>
            <Box mt={4}>
              <StatHelpText>
                Memória em uso: {formatBytes(healthStatus.system.totalMemory - healthStatus.system.freeMemory)}
                {' '}({Math.round(((healthStatus.system.totalMemory - healthStatus.system.freeMemory) / healthStatus.system.totalMemory) * 100)}%)
              </StatHelpText>
            </Box>
          </CardBody>
        </Card>
      )}

      {/* Auto-refresh indicator */}
      <Box textAlign="center">
        <Text fontSize="xs" color="gray.500">
          Atualização automática a cada 30 segundos
          {isRefetching && <Spinner size="xs" ml={2} />}
        </Text>
      </Box>
    </VStack>
  )
}
