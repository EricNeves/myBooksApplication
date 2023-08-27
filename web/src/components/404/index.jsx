import {
  Alert,
  AlertTitle,
  Center
} from '@chakra-ui/react'
import {
  InfoIcon
} from '@chakra-ui/icons'

const NotFound = ({ title }) => {
  return (
    <Center>
      <Alert
        status='error'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='200px'
        rounded={'md'}
        margin={'4rem 1rem'}
        maxW={'md'}
      >
        <InfoIcon boxSize='40px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize='lg'>
          {title}
        </AlertTitle>
      </Alert>
    </Center>
  )
}

export default NotFound