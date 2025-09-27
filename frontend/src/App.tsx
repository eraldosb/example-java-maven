import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { DashboardPage } from './pages/DashboardPage'
import { UsersPage } from './pages/UsersPage'
import { StatusPage } from './pages/StatusPage'
import theme from './theme'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/status" element={<StatusPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App
