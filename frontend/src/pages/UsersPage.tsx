import React, { useState } from 'react'
import {
  Box,
  VStack,
  HStack,
  Button,
  Text,
  Badge,
  useDisclosure,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useBreakpointValue,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { User } from '../types/user'
import { UserFilters } from '../types/user'
import { useUsers, useUserStats } from '../hooks/useUsers'
import { UserForm } from '../components/UserForm'
import { UserTable } from '../components/UserTable'
import { UserFiltersComponent } from '../components/UserFilters'

export const UsersPage: React.FC = () => {
  const [filters, setFilters] = useState<UserFilters>({})
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isMobile = useBreakpointValue({ base: true, md: false })

  const {
    data: users = [],
    isLoading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useUsers(filters)

  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useUserStats()

  const handleCreateUser = () => {
    setSelectedUser(null)
    setFormMode('create')
    onOpen()
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setFormMode('edit')
    onOpen()
  }

  const handleCloseForm = () => {
    onClose()
    setSelectedUser(null)
  }

  const handleFiltersChange = (newFilters: UserFilters) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({})
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined)

  return (
    <VStack spacing={6} align="stretch">
      {/* Header */}
      <Box>
        <HStack justify="space-between" align="center" mb={2}>
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
              Gerenciar Usuários
            </Text>
            <Text color="gray.600">
              Visualize, crie, edite e gerencie usuários do sistema
            </Text>
          </Box>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="brand"
            onClick={handleCreateUser}
            size={isMobile ? 'sm' : 'md'}
          >
            Novo Usuário
          </Button>
        </HStack>

        {/* Stats Cards */}
        {!statsLoading && !statsError && stats && (
          <HStack spacing={4} mt={4}>
            <Stat
              bg="white"
              p={4}
              borderRadius="md"
              boxShadow="sm"
              border="1px"
              borderColor="gray.200"
              flex={1}
            >
              <StatLabel>Total de Usuários</StatLabel>
              <StatNumber color="brand.500">{stats.totalUsers}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {stats.activeUsers} ativos
              </StatHelpText>
            </Stat>

            <Stat
              bg="white"
              p={4}
              borderRadius="md"
              boxShadow="sm"
              border="1px"
              borderColor="gray.200"
              flex={1}
            >
              <StatLabel>Usuários Ativos</StatLabel>
              <StatNumber color="green.500">{stats.activeUsers}</StatNumber>
              <StatHelpText>
                {stats.totalUsers > 0 
                  ? `${Math.round((stats.activeUsers / stats.totalUsers) * 100)}% do total`
                  : '0% do total'
                }
              </StatHelpText>
            </Stat>

            <Stat
              bg="white"
              p={4}
              borderRadius="md"
              boxShadow="sm"
              border="1px"
              borderColor="gray.200"
              flex={1}
            >
              <StatLabel>Usuários Inativos</StatLabel>
              <StatNumber color="red.500">{stats.inactiveUsers}</StatNumber>
              <StatHelpText>
                {stats.totalUsers > 0 
                  ? `${Math.round((stats.inactiveUsers / stats.totalUsers) * 100)}% do total`
                  : '0% do total'
                }
              </StatHelpText>
            </Stat>
          </HStack>
        )}
      </Box>

      {/* Filters */}
      <UserFiltersComponent
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />

      {/* Results Summary */}
      {hasActiveFilters && (
        <Box bg="blue.50" p={3} borderRadius="md" border="1px" borderColor="blue.200">
          <HStack>
            <Text fontSize="sm" color="blue.700">
              <strong>{users.length}</strong> usuário(s) encontrado(s) com os filtros aplicados
            </Text>
            <Badge colorScheme="blue" variant="subtle">
              Filtrado
            </Badge>
          </HStack>
        </Box>
      )}

      {/* Content */}
      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="sm"
        border="1px"
        borderColor="gray.200"
        overflow="hidden"
      >
        {usersError ? (
          <Alert status="error" borderRadius="lg">
            <AlertIcon />
            <Box>
              <AlertTitle>Erro ao carregar usuários!</AlertTitle>
              <AlertDescription>
                Não foi possível carregar a lista de usuários. Tente novamente.
              </AlertDescription>
            </Box>
          </Alert>
        ) : (
          <UserTable
            users={users}
            isLoading={usersLoading}
            onEdit={handleEditUser}
          />
        )}
      </Box>

      {/* User Form Modal */}
      <UserForm
        isOpen={isOpen}
        onClose={handleCloseForm}
        user={selectedUser}
        mode={formMode}
      />
    </VStack>
  )
}
