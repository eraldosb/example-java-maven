import React from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Skeleton,
  SkeletonText,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useUserStats, useUsers } from '../hooks/useUsers'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export const DashboardPage: React.FC = () => {
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useUserStats()

  const {
    data: users = [],
    isLoading: usersLoading,
  } = useUsers()

  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  // Prepare data for charts
  const statusData = stats ? [
    { name: 'Ativos', value: stats.activeUsers, color: '#48BB78' },
    { name: 'Inativos', value: stats.inactiveUsers, color: '#F56565' },
  ] : []

  // Age distribution data
  const ageDistribution = React.useMemo(() => {
    if (!users.length) return []

    const ageGroups = [
      { name: '< 18', min: 0, max: 17, count: 0 },
      { name: '18-24', min: 18, max: 24, count: 0 },
      { name: '25-34', min: 25, max: 34, count: 0 },
      { name: '35-44', min: 35, max: 44, count: 0 },
      { name: '45-54', min: 45, max: 54, count: 0 },
      { name: '55+', min: 55, max: 120, count: 0 },
    ]

    users.forEach(user => {
      const age = user.age
      const group = ageGroups.find(g => age >= g.min && age <= g.max)
      if (group) {
        group.count++
      }
    })

    return ageGroups
  }, [users])

  // Recent users (last 7 days)
  const recentUsers = React.useMemo(() => {
    if (!users.length) return 0

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    return users.filter(user => {
      const createdAt = new Date(user.createdAt)
      return createdAt >= sevenDaysAgo
    }).length
  }, [users])

  if (statsError) {
    return (
      <Alert status="error" borderRadius="lg">
        <AlertIcon />
        <Box>
          <AlertTitle>Erro ao carregar dashboard!</AlertTitle>
          <AlertDescription>
            Não foi possível carregar os dados do dashboard. Tente novamente.
          </AlertDescription>
        </Box>
      </Alert>
    )
  }

  return (
    <VStack spacing={6} align="stretch">
      {/* Header */}
      <Box>
        <Text fontSize="2xl" fontWeight="bold" color="gray.800">
          Dashboard
        </Text>
        <Text color="gray.600">
          Visão geral do sistema de gerenciamento de usuários
        </Text>
      </Box>

      {/* Stats Grid */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
        <GridItem>
          <Card bg={cardBg} borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel>Total de Usuários</StatLabel>
                {statsLoading ? (
                  <Skeleton height="32px" />
                ) : (
                  <StatNumber color="brand.500">{stats?.totalUsers || 0}</StatNumber>
                )}
                <StatHelpText>
                  <StatArrow type="increase" />
                  {recentUsers} novos esta semana
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card bg={cardBg} borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel>Usuários Ativos</StatLabel>
                {statsLoading ? (
                  <Skeleton height="32px" />
                ) : (
                  <StatNumber color="green.500">{stats?.activeUsers || 0}</StatNumber>
                )}
                <StatHelpText>
                  {stats?.totalUsers ? 
                    `${Math.round((stats.activeUsers / stats.totalUsers) * 100)}% do total` 
                    : '0% do total'
                  }
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card bg={cardBg} borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel>Usuários Inativos</StatLabel>
                {statsLoading ? (
                  <Skeleton height="32px" />
                ) : (
                  <StatNumber color="red.500">{stats?.inactiveUsers || 0}</StatNumber>
                )}
                <StatHelpText>
                  {stats?.totalUsers ? 
                    `${Math.round((stats.inactiveUsers / stats.totalUsers) * 100)}% do total` 
                    : '0% do total'
                  }
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card bg={cardBg} borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel>Taxa de Ativação</StatLabel>
                {statsLoading ? (
                  <Skeleton height="32px" />
                ) : (
                  <StatNumber color="blue.500">
                    {stats?.totalUsers ? 
                      `${Math.round((stats.activeUsers / stats.totalUsers) * 100)}%` 
                      : '0%'
                    }
                  </StatNumber>
                )}
                <StatHelpText>
                  Usuários ativos vs total
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      {/* Charts Grid */}
      <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
        {/* Status Distribution Pie Chart */}
        <GridItem>
          <Card bg={cardBg} borderColor={borderColor}>
            <CardHeader>
              <Heading size="md">Distribuição por Status</Heading>
            </CardHeader>
            <CardBody>
              {statsLoading ? (
                <Skeleton height="300px" />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: any) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardBody>
          </Card>
        </GridItem>

        {/* Age Distribution Bar Chart */}
        <GridItem>
          <Card bg={cardBg} borderColor={borderColor}>
            <CardHeader>
              <Heading size="md">Distribuição por Faixa Etária</Heading>
            </CardHeader>
            <CardBody>
              {usersLoading ? (
                <Skeleton height="300px" />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ageDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      {/* Recent Activity */}
      <Card bg={cardBg} borderColor={borderColor}>
        <CardHeader>
          <Heading size="md">Atividade Recente</Heading>
        </CardHeader>
        <CardBody>
          {usersLoading ? (
            <VStack spacing={3} align="stretch">
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonText key={index} noOfLines={2} spacing="2" />
              ))}
            </VStack>
          ) : (
            <VStack spacing={3} align="stretch">
              {users.slice(0, 5).map((user) => (
                <HStack key={user.id} justify="space-between" p={3} bg="gray.50" borderRadius="md">
                  <Box>
                    <Text fontWeight="medium">{user.name}</Text>
                    <Text fontSize="sm" color="gray.600">{user.email}</Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="sm" color="gray.500">
                      Criado em {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                    </Text>
                    <Text fontSize="xs" color={user.active ? 'green.500' : 'red.500'}>
                      {user.active ? 'Ativo' : 'Inativo'}
                    </Text>
                  </Box>
                </HStack>
              ))}
              {users.length === 0 && (
                <Text color="gray.500" textAlign="center" py={4}>
                  Nenhum usuário encontrado
                </Text>
              )}
            </VStack>
          )}
        </CardBody>
      </Card>
    </VStack>
  )
}
