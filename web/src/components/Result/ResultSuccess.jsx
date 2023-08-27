import {
  Alert,
  AlertIcon,
  AlertTitle
} from '@chakra-ui/react'

const ResultSuccess = ({ msg }) => {
  return (
    <Alert status='success' rounded={'md'}>
      <AlertIcon />
      <AlertTitle>{msg}</AlertTitle>
    </Alert>
  )
}

export default ResultSuccess