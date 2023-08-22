import '../../assets/main.css'

import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardBody,
  Text,
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
        'Authorization': authorization
      },
    }

    fetch('http://localhost:8000/books', config)
      .then(res => res.json())
      .then(res => setBooks(res.data))
  }

  useEffect(() => {
    if (authorization) {
      fetchBooks()
    }
  }, [authorization])

  return (
    <Center>
      <Box className='booksbox' >
        {books.map(book => (
          <Card maxW='lg' key={book.id}>
            <CardBody>
              <Image
                src={book.url}
                alt={book.title}
                height={'200px'}
                objectFit={'cover'}
                borderRadius='lg'
              />
              <Stack mt='6' spacing='3'>
                <Heading fontWeight={'semibold'} size='xs'>{book.title}</Heading>
              </Stack>

              <Text mt={'2'} fontSize={'small'} color={'gray.700'}>{book.created_at}</Text>

              <Button
                variant='outline' mt='3'
                size={'sm'}
                _hover={{ background: 'blue.500', color: 'white' }}
                colorScheme='blue'
              >
                View More...
              </Button>
            </CardBody>
          </Card>
        ))}
      </Box>
    </Center>
  )
}

export default ContentHome