import { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import ResultError from '../Result/ResultErro'
import ResultSuccess from '../Result/ResultSuccess'

import { api } from '../../api'

const DeleteModal = ({ isOpen, onClose, id }) => {
  const [result, setResult] = useState("")

  const navigate = useNavigate()

  const deleteBook = async () => {
    try {
      const request = await api.delete(`/books/${id}/remove`)

      setResult(request?.data)
      navigate('/dashboard')
    } catch (err) {
      setResult(err?.response?.data)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        {result?.error && <ResultError msg={result?.error} />}
        {result?.success && <ResultSuccess msg={result?.success} />}
        </ModalBody>
        <ModalFooter>
          <Button onClick={deleteBook} colorScheme='red' mr={3}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteModal