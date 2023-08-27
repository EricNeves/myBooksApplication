import { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Image,
  Textarea
} from '@chakra-ui/react'

import ResultError from '../Result/ResultErro'
import ResultSuccess from '../Result/ResultSuccess'

import { api } from '../../api'

const EditModal = ({ isOpen, onClose, id, titleBook, descriptionBook, imageBook }) => {
  const [fields, setFields] = useState({
    title: "",
    description: ""
  })
  const [image, setImage] = useState("")
  const [result, setResult] = useState("")

  useEffect(() => {
    setFields({
      title: titleBook,
      description: descriptionBook
    })
  }, [titleBook, descriptionBook, imageBook])

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

  const updateBook = async () => {
    const bodyForm = {
      ...fields,
      image
    }
    try {
      const request = await api.put(`books/${id}/update`, bodyForm)

      setResult(request?.data)
    } catch (err) {
      setResult(err?.response?.data)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {result?.error && <ResultError msg={result?.error} />}
          {result?.success && <ResultSuccess msg={result?.success} />}
          <FormControl id="email">
            <FormLabel>Title</FormLabel>
            <Input type="text" name="title" value={fields.title} onChange={updatedFields} />
          </FormControl>

          <FormControl id="email">
            <FormLabel>Description</FormLabel>
            <Textarea name="description" value={fields.description} onChange={updatedFields} />
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
              paddingTop={'1rem'}
              rounded={'md'}
              src={image}
              alt={fields.title}
            />
          }
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='facebook' mr={3} onClick={updateBook}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditModal