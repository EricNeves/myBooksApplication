import { useState } from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Textarea,
  useColorModeValue,
  Image
} from '@chakra-ui/react'

import SideBar from './SideBar'

import ResultError from '../Result/ResultErro'
import ResultSuccess from '../Result/ResultSuccess'

import { api } from '../../api'

const CreateBook = () => {
  const [fields, setFields] = useState({
    title: "",
    description: ""
  })
  const [image, setImage] = useState("")
  const [result, setResult] = useState("")

  const updatedImage = e => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setImage(reader.result)
      }

      reader.readAsDataURL(file)
    }
  }

  const updatedFields = e => {
    setFields(old => (
      {
        ...old,
        [e.target.name]: e.target.value
      }
    ))
  }

  const uploadBook = async () => {
    const bodyForm = {
      ...fields,
      image
    }
    try {
      const request = await api.post('/books/create', bodyForm)

      setResult(request?.data)
    } catch (err) {
      setResult(err?.response?.data)
    }
  }

  return (
    <SideBar>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'3xl'} fontWeight={'normal'}>Create a new book</Heading>
          </Stack>
          {result?.error && <ResultError msg={result?.error} />}
          {result?.success && <ResultSuccess msg={result?.success} />}
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            maxW={'full'}
            w={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Title</FormLabel>
                <Input type="text" name="title" onChange={updatedFields} />
              </FormControl>

              <FormControl id="email">
                <FormLabel>Description</FormLabel>
                <Textarea name="description" onChange={updatedFields} />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Image</FormLabel>
                <Input type="file" name="image" onChange={updatedImage} />
              </FormControl>

              {
                image
                &&
                <Image
                  boxSize='100px'
                  objectFit='cover'
                  rounded={'md'}
                  src={image}
                  alt=''
                />
              }

              <Stack spacing={10}>
                <Button
                  onClick={uploadBook}
                  bg={'green.400'}
                  color={'white'}
                  _hover={{
                    bg: 'green.500',
                  }}>
                  Create
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </SideBar>
  )
}

export default CreateBook