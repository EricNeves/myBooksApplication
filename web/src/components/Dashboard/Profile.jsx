import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'

import SideBar from "./SideBar"
import { api } from '../../api'

import ResultError from '../Result/ResultErro'
import ResultSuccess from '../Result/ResultSuccess'

const Profile = () => {
  const [field, setField] = useState({
    name: "", password: ""
  })
  const [result, setResult] = useState("")

  const fetchUser = async () => {
    const request = await api.get('/users')

    const { data } = request.data

    data.map(({ name, password }) => {
      setField(old => (
        {
          ...old,
          name, password
        }
      ))
    })
  }

  const updateUser = async () => {
    try {
      const update = await api.put('/users/update', field)

      setResult(update.data)
    } catch (err) {
      setResult(err?.response?.data)
    }
  }

  const updatedField = (e) => {
    setField(old => (
      {
        ...old,
        [e.target.name]: e.target.value
      }
    ))
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <SideBar>
      <Flex
        minH={'100vh'}
        align={'self-start'}
        justify={'center'}
      >
        <Stack spacing={8} mx={'auto'} maxW={'full'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'3xl'} fontWeight={'normal'}>
              My informations
            </Heading>
            <EditIcon />
          </Stack>
          {result?.error && <ResultError msg={result?.error} />}
          {result?.success && <ResultSuccess msg={result?.success} />}
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            w={'3xl'}
            maxW={'full'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" value={field.name} onChange={updatedField} />
              </FormControl>

              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" onChange={updatedField} />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  onClick={updateUser}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Update
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </SideBar>
  )
}

export default Profile