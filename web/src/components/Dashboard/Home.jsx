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
import { Link } from 'react-router-dom'

import { api } from '../../api'

import SideBar from './SideBar'

const ContentHome = () => {
  const [books, setBooks] = useState([])

  const fetchBooks = async () => {
    const request = await api.get('/books')
    const { data } = request.data

    setBooks(data)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <SideBar>
      <Center>
        <Box className='booksbox' >
          {books.map(book => (
            <Card maxW='lg' key={book.id}>
              <CardBody>
                <Image
                  src={book.url}
                  alt={book.title}
                  height={'200px'}
                  width={'400px'}
                  objectFit={'cover'}
                  borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                  <Heading fontWeight={'semibold'} size='xs'>{book.title}</Heading>
                </Stack>

                <Text mt={'2'} fontSize={'small'} color={'gray.700'}>{book.created_at}</Text>

                <Link to={`/dashboard/books/${book.id}`}>
                  <Button
                    variant='outline' mt='3'
                    size={'sm'}
                    _hover={{ background: 'blue.500', color: 'white' }}
                    colorScheme='blue'
                  >
                    View More...
                  </Button>
                </Link>
              </CardBody>
            </Card>
          ))}
        </Box>
      </Center>
    </SideBar>
  )
}

export default ContentHome