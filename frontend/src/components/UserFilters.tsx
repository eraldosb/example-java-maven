import React from 'react'
import {
  Box,
  HStack,
  VStack,
  Input,
  Select,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  useBreakpointValue,
  IconButton,
  Tooltip,
} from '@chakra-ui/react'
import { SearchIcon, CloseIcon } from '@chakra-ui/icons'
import { UserFilters } from '../types/user'

interface UserFiltersProps {
  filters: UserFilters
  onFiltersChange: (filters: UserFilters) => void
  onClearFilters: () => void
}

export const UserFiltersComponent: React.FC<UserFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  const handleNameChange = (value: string) => {
    onFiltersChange({ ...filters, name: value || undefined })
  }

  const handleMinAgeChange = (value: string) => {
    const numValue = parseInt(value)
    onFiltersChange({
      ...filters,
      minAge: isNaN(numValue) ? undefined : numValue,
    })
  }

  const handleMaxAgeChange = (value: string) => {
    const numValue = parseInt(value)
    onFiltersChange({
      ...filters,
      maxAge: isNaN(numValue) ? undefined : numValue,
    })
  }

  const handleStatusChange = (value: string) => {
    let active: boolean | undefined
    if (value === 'active') active = true
    else if (value === 'inactive') active = false
    else active = undefined

    onFiltersChange({ ...filters, active })
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined)

  const filterContent = (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel fontSize="sm" fontWeight="medium">
          Buscar por nome ou email
        </FormLabel>
        <Input
          placeholder="Digite o nome ou email..."
          value={filters.name || ''}
          onChange={(e) => handleNameChange(e.target.value)}
          focusBorderColor="brand.500"
        />
      </FormControl>

      <HStack spacing={4}>
        <FormControl>
          <FormLabel fontSize="sm" fontWeight="medium">
            Idade mínima
          </FormLabel>
          <NumberInput
            value={filters.minAge || ''}
            onChange={handleMinAgeChange}
            min={0}
            max={120}
            focusBorderColor="brand.500"
          >
            <NumberInputField placeholder="0" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel fontSize="sm" fontWeight="medium">
            Idade máxima
          </FormLabel>
          <NumberInput
            value={filters.maxAge || ''}
            onChange={handleMaxAgeChange}
            min={0}
            max={120}
            focusBorderColor="brand.500"
          >
            <NumberInputField placeholder="120" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </HStack>

      <FormControl>
        <FormLabel fontSize="sm" fontWeight="medium">
          Status
        </FormLabel>
        <Select
          value={
            filters.active === true
              ? 'active'
              : filters.active === false
              ? 'inactive'
              : 'all'
          }
          onChange={(e) => handleStatusChange(e.target.value)}
          focusBorderColor="brand.500"
        >
          <option value="all">Todos</option>
          <option value="active">Apenas ativos</option>
          <option value="inactive">Apenas inativos</option>
        </Select>
      </FormControl>

      {hasActiveFilters && (
        <HStack justify="space-between">
          <Button
            size="sm"
            variant="outline"
            colorScheme="red"
            leftIcon={<CloseIcon />}
            onClick={onClearFilters}
          >
            Limpar filtros
          </Button>
          <Button
            size="sm"
            colorScheme="brand"
            leftIcon={<SearchIcon />}
            onClick={() => {
              // Trigger search - this will be handled by the parent component
            }}
          >
            Aplicar filtros
          </Button>
        </HStack>
      )}
    </VStack>
  )

  if (isMobile) {
    return (
      <Box
        bg="white"
        p={4}
        borderRadius="md"
        boxShadow="sm"
        border="1px"
        borderColor="gray.200"
      >
        {filterContent}
      </Box>
    )
  }

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="sm"
      border="1px"
      borderColor="gray.200"
    >
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between" align="center">
          <Box>
            <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
              Filtros
            </h3>
            <p style={{ fontSize: '14px', color: '#718096', margin: '4px 0 0 0' }}>
              Filtre os usuários por diferentes critérios
            </p>
          </Box>
          {hasActiveFilters && (
            <Tooltip label="Limpar todos os filtros">
              <IconButton
                aria-label="Limpar filtros"
                icon={<CloseIcon />}
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={onClearFilters}
              />
            </Tooltip>
          )}
        </HStack>
        {filterContent}
      </VStack>
    </Box>
  )
}
