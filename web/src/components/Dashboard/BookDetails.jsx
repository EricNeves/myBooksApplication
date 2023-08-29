import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  CardBody,
  CardFooter,
  Heading,
  Text,
  Stack,
  Card,
  Image,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

import SideBar from './SideBar'

import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import NotFound from '../404'

import { api } from '../../api'

const BookDetails = () => {
  const [book, setBook] = useState({})

  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()

  const { id } = useParams()

  const fetchBook = async () => {
    try {
      const request = await api.get(`books/${id}/list`)
      const { data } = request.data
      setBook(data)
    } catch (err) {
      setBook(err?.response?.data)
    }
  }

  useEffect(() => {
    fetchBook()
  }, [book])

  return (
    <>
      <SideBar>
        {book?.error ?
          <NotFound title={'Book Not Found'} />
          :
          <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
          >
            <Image
              objectFit='cover'
              maxW={{ base: '100%', sm: '200px' }}
              src={book?.image+`?timestamp=${Date.now()}`} alt={book?.title}
            />

            <Stack>
              <CardBody>
                <Heading size='md'>{book?.title}</Heading>

                <Text py='2' color={'blackAlpha.600'}>
                  {book?.created_at}
                </Text>

                <Text py='2'>
                  {book?.description}
                </Text>
              </CardBody>

              <CardFooter>
                <Button onClick={onOpenEdit} variant='solid' marginRight={'1rem'} colorScheme='orange'>
                  Edit book
                  <EditIcon marginLeft={'.5rem'} />
                </Button>

                <Button onClick={onOpenDelete} variant='solid' colorScheme='red'>
                  Delete book
                  <DeleteIcon marginLeft={'.5rem'} />
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        }
      </SideBar>

      {/* Edit Modal */}
      <EditModal
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        id={book?.id}
        titleBook={book?.title}
        descriptionBook={book?.description}
        imageBook={book?.image}
      />

      {/* Delete Modal */}
      <DeleteModal
        id={id}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
      />
    </>
  )
}

export default BookDetails

