import React from 'react'
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  IconButton,
  useDisclosure,
  useBreakpointValue,
  useColorModeValue,
  Spacer,
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  SettingsIcon,
  InfoIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Link } from '@chakra-ui/react'
import { useAuth } from '../contexts/AuthContext'

interface LayoutProps {
  children: React.ReactNode
}

interface NavItem {
  label: string
  href: string
  icon?: React.ReactElement
  badge?: string | number
}

const NavItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: <SettingsIcon /> },
  { label: 'Usuários', href: '/users', icon: <SettingsIcon /> },
  { label: 'Status', href: '/status', icon: <InfoIcon /> },
]

const SidebarContent = ({ onClose }: { onClose: () => void }) => {
  const location = useLocation()
  
  return (
    <VStack align="stretch" spacing={0} h="full">
      <Box p={4} borderBottom="1px" borderColor="gray.200">
        <Text fontSize="xl" fontWeight="bold" color="brand.500">
          User Management
        </Text>
        <Text fontSize="sm" color="gray.600">
          Sistema de Gestão de Usuários
        </Text>
      </Box>
      
      <VStack align="stretch" spacing={1} p={4} flex={1}>
        {NavItems.map((item) => {
          const isActive = location.pathname === item.href
          
          return (
            <Link
              key={item.href}
              as={RouterLink}
              to={item.href}
              onClick={onClose}
              display="flex"
              alignItems="center"
              px={3}
              py={2}
              borderRadius="md"
              bg={isActive ? 'brand.50' : 'transparent'}
              color={isActive ? 'brand.600' : 'gray.700'}
              fontWeight={isActive ? 'semibold' : 'normal'}
              _hover={{
                bg: isActive ? 'brand.100' : 'gray.100',
                textDecoration: 'none',
              }}
              transition="all 0.2s"
            >
              {item.icon && (
                <Box mr={3} fontSize="sm">
                  {item.icon}
                </Box>
              )}
              <Text flex={1}>{item.label}</Text>
              {item.badge && (
                <Badge colorScheme="brand" variant="subtle" ml={2}>
                  {item.badge}
                </Badge>
              )}
            </Link>
          )
        })}
      </VStack>
      
      <Box p={4} borderTop="1px" borderColor="gray.200">
        <Text fontSize="xs" color="gray.500" textAlign="center">
          © 2025 User Management App
        </Text>
      </Box>
    </VStack>
  )
}

const MobileNav = ({ onOpen }: { onOpen: () => void }) => {
  const { user, logout } = useAuth()

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<HamburgerIcon />}
      />

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Text fontSize="lg" fontWeight="bold" color="brand.500">
            User Management v2.1
          </Text>
        </Flex>
        
        <Spacer />
        
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost">
            <HStack>
              <Avatar size="sm" name={user?.name} />
              <VStack spacing={0} align="start" display={{ base: 'none', md: 'flex' }}>
                <Text fontSize="sm" fontWeight="bold">{user?.name}</Text>
                <Text fontSize="xs" color="gray.500">
                  {user?.roles.includes('ADMIN') ? 'Administrador' : 'Usuário'}
                </Text>
              </VStack>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={logout}>
              Sair
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  )
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Box
        bg={useColorModeValue('white', 'gray.900')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        display={{ base: 'none', md: 'block' }}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <SidebarContent onClose={onClose} />
      </Box>

      {/* Mobile menu - simplified for now */}
      {isOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.600"
          zIndex={1000}
          onClick={onClose}
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            bottom={0}
            width="280px"
            bg="white"
            shadow="xl"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent onClose={onClose} />
          </Box>
        </Box>
      )}

      <Box ml={{ base: 0, md: 60 }} p="4">
        <MobileNav onOpen={onOpen} />
        <Box mt={4}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
