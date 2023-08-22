import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text
} from '@chakra-ui/react'

import {
  DragHandleIcon,
  SettingsIcon,
  AddIcon,
  UnlockIcon
} from '@chakra-ui/icons'

import { Link } from 'react-router-dom'

import NavItem from './NavItem'

import { Context } from '../../contexts/AuthContext'
import { useContext } from 'react'

const SidebarContent = ({ onClose, ...rest }) => {

  const { handleLogout } = useContext(Context)

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          My Books
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Link to='/dashboard'>
        <NavItem icon={DragHandleIcon}>
          Home
        </NavItem>
      </Link>

      <Link to='/dashboard/profile'>
        <NavItem icon={SettingsIcon}>
          Profile
        </NavItem>
      </Link>

      <Link to='/dashboard/createbook'>
        <NavItem icon={AddIcon}>
          Add Book
        </NavItem>
      </Link>

      <Link onClick={handleLogout}>
        <NavItem icon={UnlockIcon}>
          Logout
        </NavItem>
      </Link>
    </Box>
  )
}

export default SidebarContent