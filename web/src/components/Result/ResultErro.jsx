import {
  Alert,
  AlertIcon,
  AlertTitle
} from '@chakra-ui/react'

const ResultError = ({ msg }) => {
  return (
    <Alert status='error'>
      <AlertIcon />
      <AlertTitle>{msg}</AlertTitle>
    </Alert>
  )
}

export default ResultError