import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  VStack,
  HStack,
  useToast,
} from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import { User, CreateUserRequest } from '../types/user'
import { useCreateUser, useUpdateUser } from '../hooks/useUsers'

interface UserFormProps {
  isOpen: boolean
  onClose: () => void
  user?: User | null
  mode: 'create' | 'edit'
}

interface UserFormData {
  name: string
  email: string
  phone?: string
  age: number
  active: boolean
}

// Simple validation functions
const validateName = (value: string) => {
  if (!value) return 'Nome é obrigatório'
  if (value.length < 2) return 'Nome deve ter pelo menos 2 caracteres'
  if (value.length > 100) return 'Nome deve ter no máximo 100 caracteres'
  return true
}

const validateEmail = (value: string) => {
  if (!value) return 'Email é obrigatório'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) return 'Formato de email inválido'
  return true
}

const validatePhone = (value?: string) => {
  if (!value) return true // Phone is optional
  const phoneRegex = /^(\(\d{2}\)\s?\d{4,5}-?\d{4}|\d{10,11})$/
  if (!phoneRegex.test(value)) return 'Formato de telefone inválido'
  return true
}

const validateAge = (value: number) => {
  if (!value && value !== 0) return 'Idade é obrigatória'
  if (value < 0) return 'Idade deve ser maior ou igual a 0'
  if (value > 120) return 'Idade deve ser menor ou igual a 120'
  if (!Number.isInteger(value)) return 'Idade deve ser um número inteiro'
  return true
}

export const UserForm: React.FC<UserFormProps> = ({
  isOpen,
  onClose,
  user,
  mode,
}) => {
  const toast = useToast()
  const createUserMutation = useCreateUser()
  const updateUserMutation = useUpdateUser()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      age: user?.age || 0,
      active: user?.active ?? true,
    },
  })

  // Reset form when user changes
  React.useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        age: user.age,
        active: user.active,
      })
    } else {
      reset({
        name: '',
        email: '',
        phone: '',
        age: 0,
        active: true,
      })
    }
  }, [user, reset])

  const onSubmit = async (data: UserFormData) => {
    try {
      const userData: CreateUserRequest = {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim() || undefined,
        age: data.age,
        active: data.active,
      }

      if (mode === 'create') {
        await createUserMutation.mutateAsync(userData)
      } else if (user) {
        await updateUserMutation.mutateAsync({
          id: user.id,
          userData,
        })
      }

      onClose()
    } catch (error) {
      // Error handling is done in the mutation hooks
      console.error('Form submission error:', error)
    }
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length >= 2) {
      return `(${numbers.substring(0, 2)}) ${numbers.substring(2)}`
    }
    return numbers
  }

  const handlePhoneChange = (value: string, onChange: (value: string) => void) => {
    const formatted = formatPhone(value)
    if (formatted.length <= 15) { // Limit to (11) 99999-9999 format
      onChange(formatted)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {mode === 'create' ? 'Novo Usuário' : 'Editar Usuário'}
        </ModalHeader>
        <ModalCloseButton />
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Nome *</FormLabel>
                <Controller
                  name="name"
                  control={control}
                  rules={{ validate: validateName }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Digite o nome completo"
                      focusBorderColor="brand.500"
                    />
                  )}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email *</FormLabel>
                <Controller
                  name="email"
                  control={control}
                  rules={{ validate: validateEmail }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="usuario@exemplo.com"
                      focusBorderColor="brand.500"
                    />
                  )}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.phone}>
                <FormLabel>Telefone</FormLabel>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ validate: validatePhone }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="(11) 99999-9999"
                      focusBorderColor="brand.500"
                      onChange={(e) => handlePhoneChange(e.target.value, field.onChange)}
                    />
                  )}
                />
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.age}>
                <FormLabel>Idade *</FormLabel>
                <Controller
                  name="age"
                  control={control}
                  rules={{ validate: validateAge }}
                  render={({ field }) => (
                    <NumberInput
                      {...field}
                      min={0}
                      max={120}
                      focusBorderColor="brand.500"
                    >
                      <NumberInputField placeholder="Digite a idade" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  )}
                />
                <FormErrorMessage>{errors.age?.message}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <Controller
                  name="active"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      isChecked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      colorScheme="brand"
                    >
                      Usuário ativo
                    </Checkbox>
                  )}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <HStack spacing={3}>
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                type="submit"
                colorScheme="brand"
                isLoading={isSubmitting}
                loadingText={mode === 'create' ? 'Criando...' : 'Salvando...'}
              >
                {mode === 'create' ? 'Criar Usuário' : 'Salvar Alterações'}
              </Button>
            </HStack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
