import '../../assets/main.css'

import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Center
} from '@chakra-ui/react'

import { Context } from '../../contexts/AuthContext'
import { useContext } from 'react'

const ContentHome = () => {

  const [books, setBooks] = useState([])

  const { authorization } = useContext(Context)

  const fetchBooks = async () => {
    const config = {
      method: 'GET',
      withCredentials: 'true',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.vA2zHLz_t717ZlMyi5g1ePJGyOUbo8vx8fUPLwjwKUc'
      },
    }
    
    fetch('http://localhost:8000/books', config)
      .then(res => res.json())
      .then(console.log)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <Center>
      <Box className='booksbox' >
        <Card maxW='lg'>
          <CardBody>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading fontWeight={'medium'} size='sm'>Living room Sofa</Heading>
            </Stack>

            <Button
              variant='outline' mt='3'
              size={'sm'}
              _hover={{ background: 'blue.500', color: 'white' }}
              colorScheme='blue'
            >
              Read More...
            </Button>
          </CardBody>
        </Card>
      </Box>
    </Center>
  )
}

export default ContentHome