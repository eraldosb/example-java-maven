import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userService } from '../services/api'
import { User, CreateUserRequest, UserFilters, UserStats } from '../types/user'
import { useToast } from '@chakra-ui/react'

// Query keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: UserFilters) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
  stats: () => [...userKeys.all, 'stats'] as const,
  active: () => [...userKeys.all, 'active'] as const,
  inactive: () => [...userKeys.all, 'inactive'] as const,
}

// Hook para buscar usuários
export const useUsers = (filters?: UserFilters) => {
  return useQuery({
    queryKey: userKeys.list(filters || {}),
    queryFn: () => userService.getUsers(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook para buscar usuário por ID
export const useUser = (id: number) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
  })
}

// Hook para estatísticas de usuários
export const useUserStats = () => {
  return useQuery({
    queryKey: userKeys.stats(),
    queryFn: userService.getUserStats,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  })
}

// Hook para usuários ativos
export const useActiveUsers = () => {
  return useQuery({
    queryKey: userKeys.active(),
    queryFn: userService.getActiveUsers,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para usuários inativos
export const useInactiveUsers = () => {
  return useQuery({
    queryKey: userKeys.inactive(),
    queryFn: userService.getInactiveUsers,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para criar usuário
export const useCreateUser = () => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (userData: CreateUserRequest) => userService.createUser(userData),
    onSuccess: (newUser) => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.stats() })
      
      toast({
        title: 'Usuário criado com sucesso!',
        description: `${newUser.name} foi adicionado ao sistema.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao criar usuário',
        description: error.response?.data?.message || 'Ocorreu um erro inesperado.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  })
}

// Hook para atualizar usuário
export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: ({ id, userData }: { id: number; userData: CreateUserRequest }) =>
      userService.updateUser(id, userData),
    onSuccess: (updatedUser) => {
      // Update the specific user in cache
      queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser)
      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.stats() })
      
      toast({
        title: 'Usuário atualizado com sucesso!',
        description: `Os dados de ${updatedUser.name} foram atualizados.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao atualizar usuário',
        description: error.response?.data?.message || 'Ocorreu um erro inesperado.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  })
}

// Hook para deletar usuário
export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: userKeys.detail(deletedId) })
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.stats() })
      
      toast({
        title: 'Usuário deletado com sucesso!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao deletar usuário',
        description: error.response?.data?.message || 'Ocorreu um erro inesperado.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  })
}

// Hook para ativar usuário
export const useActivateUser = () => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (id: number) => userService.activateUser(id),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser)
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.stats() })
      
      toast({
        title: 'Usuário ativado!',
        description: `${updatedUser.name} foi ativado com sucesso.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao ativar usuário',
        description: error.response?.data?.message || 'Ocorreu um erro inesperado.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  })
}

// Hook para desativar usuário
export const useDeactivateUser = () => {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (id: number) => userService.deactivateUser(id),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser)
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.stats() })
      
      toast({
        title: 'Usuário desativado!',
        description: `${updatedUser.name} foi desativado com sucesso.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao desativar usuário',
        description: error.response?.data?.message || 'Ocorreu um erro inesperado.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  })
}
