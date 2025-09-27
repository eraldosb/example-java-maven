import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  HStack,
  IconButton,
  Tooltip,
  useDisclosure,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Text,
  Box,
  Skeleton,
  SkeletonText,
  Button,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon, ViewIcon, LockIcon } from '@chakra-ui/icons'
import { User } from '../types/user'
import { useDeleteUser, useActivateUser, useDeactivateUser } from '../hooks/useUsers'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useAuth } from '../contexts/AuthContext'
import TokenModal from './TokenModal'

interface UserTableProps {
  users: User[]
  isLoading?: boolean
  onEdit: (user: User) => void
  onView?: (user: User) => void
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  isLoading = false,
  onEdit,
  onView,
}) => {
  const toast = useToast()
  const { user: currentUser } = useAuth()
  const deleteUserMutation = useDeleteUser()
  const activateUserMutation = useActivateUser()
  const deactivateUserMutation = useDeactivateUser()
  
  // Token generation state
  const [tokenModalOpen, setTokenModalOpen] = React.useState(false)
  const [generatedToken, setGeneratedToken] = React.useState('')
  const [tokenUserEmail, setTokenUserEmail] = React.useState('')
  const [isGeneratingToken, setIsGeneratingToken] = React.useState(false)
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [userToDelete, setUserToDelete] = React.useState<User | null>(null)
  const cancelRef = React.useRef<HTMLButtonElement>(null)

  // Generate token function
  const handleGenerateToken = async (user: User) => {
    setIsGeneratingToken(true)
    try {
      const response = await fetch('/api/admin/generate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ email: user.email }),
      })

      if (!response.ok) {
        throw new Error('Erro ao gerar token')
      }

      const data = await response.json()
      setGeneratedToken(data.token)
      setTokenUserEmail(user.email)
      setTokenModalOpen(true)
      
      toast({
        title: 'Token gerado!',
        description: `Token gerado para ${user.name}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Erro ao gerar token',
        description: 'Não foi possível gerar o token',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsGeneratingToken(false)
    }
  }

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user)
    onOpen()
  }

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      try {
        await deleteUserMutation.mutateAsync(userToDelete.id)
        onClose()
        setUserToDelete(null)
      } catch (error) {
        // Error handling is done in the mutation hook
      }
    }
  }

  const handleToggleStatus = async (user: User) => {
    try {
      if (user.active) {
        await deactivateUserMutation.mutateAsync(user.id)
      } else {
        await activateUserMutation.mutateAsync(user.id)
      }
    } catch (error) {
      // Error handling is done in the mutation hook
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: ptBR })
    } catch {
      return 'Data inválida'
    }
  }

  if (isLoading) {
    return (
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Telefone</Th>
              <Th>Idade</Th>
              <Th>Status</Th>
              <Th>Criado em</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <Tr key={index}>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    )
  }

  if (users.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="gray.500" fontSize="lg">
          Nenhum usuário encontrado
        </Text>
        <Text color="gray.400" fontSize="sm">
          Clique em "Novo Usuário" para adicionar o primeiro usuário
        </Text>
      </Box>
    )
  }

  return (
    <>
      <TableContainer>
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Telefone</Th>
              <Th>Idade</Th>
              <Th>Status</Th>
              <Th>Criado em</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id} _hover={{ bg: 'gray.50' }}>
                <Td>
                  <Text fontWeight="medium">{user.name}</Text>
                </Td>
                <Td>
                  <Text fontSize="sm" color="gray.600">{user.email}</Text>
                </Td>
                <Td>
                  <Text fontSize="sm" color="gray.600">
                    {user.phone || '-'}
                  </Text>
                </Td>
                <Td>
                  <Text fontSize="sm">{user.age} anos</Text>
                </Td>
                <Td>
                  <Badge
                    colorScheme={user.active ? 'green' : 'red'}
                    variant="subtle"
                    px={2}
                    py={1}
                    borderRadius="full"
                  >
                    {user.active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </Td>
                <Td>
                  <Text fontSize="sm" color="gray.600">
                    {formatDate(user.createdAt)}
                  </Text>
                </Td>
                <Td>
                  <HStack spacing={1}>
                    {onView && (
                      <Tooltip label="Visualizar">
                        <IconButton
                          aria-label="Visualizar usuário"
                          icon={<ViewIcon />}
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                          onClick={() => onView(user)}
                        />
                      </Tooltip>
                    )}
                    
                    <Tooltip label="Editar">
                      <IconButton
                        aria-label="Editar usuário"
                        icon={<EditIcon />}
                        size="sm"
                        variant="ghost"
                        colorScheme="blue"
                        onClick={() => onEdit(user)}
                      />
                    </Tooltip>
                    
                    {currentUser?.roles.includes('ADMIN') && (
                      <Tooltip label="Gerar Token">
                        <IconButton
                          aria-label="Gerar token para usuário"
                          icon={<LockIcon />}
                          size="sm"
                          variant="ghost"
                          colorScheme="purple"
                          onClick={() => handleGenerateToken(user)}
                          isLoading={isGeneratingToken}
                        />
                      </Tooltip>
                    )}
                    
                    <Tooltip label={user.active ? 'Desativar' : 'Ativar'}>
                      <IconButton
                        aria-label={user.active ? 'Desativar usuário' : 'Ativar usuário'}
                        icon={<ViewIcon />}
                        size="sm"
                        variant="ghost"
                        colorScheme={user.active ? 'orange' : 'green'}
                        onClick={() => handleToggleStatus(user)}
                        isLoading={
                          activateUserMutation.isPending || deactivateUserMutation.isPending
                        }
                      />
                    </Tooltip>
                    
                    <Tooltip label="Deletar">
                      <IconButton
                        aria-label="Deletar usuário"
                        icon={<DeleteIcon />}
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleDeleteClick(user)}
                        isLoading={deleteUserMutation.isPending}
                      />
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar Usuário
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja deletar o usuário{' '}
              <Text as="span" fontWeight="bold">
                {userToDelete?.name}
              </Text>
              ? Esta ação não pode ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDeleteConfirm}
                ml={3}
                isLoading={deleteUserMutation.isPending}
              >
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Token Modal */}
      <TokenModal
        isOpen={tokenModalOpen}
        onClose={() => setTokenModalOpen(false)}
        token={generatedToken}
        userEmail={tokenUserEmail}
      />
    </>
  )
}
