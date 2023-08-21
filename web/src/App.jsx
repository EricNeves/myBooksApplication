import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import './assets/main.css'

import Routes from './Routes'
import {
  AuthProvider
} from './contexts/AuthContext'

const App = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App