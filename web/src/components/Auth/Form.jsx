import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import ResultErro from '../Result/ResultErro'

const Form = ({ handleLogin, fields, updatedFields, result, loading }) => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontWeight={'light'} fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        {result?.error && <ResultErro msg={result.error} />}
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input name="email" autoComplete='off' onChange={updatedFields} type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input name="password" onChange={updatedFields} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Button
                onClick={() => handleLogin(fields)}
                isLoading={loading}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>

              <Stack>
                <Link className='linkPrimary' to={'/register'}>Create a new account</Link>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Form