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

const LinkItems = [
  { name: 'Home', icon: DragHandleIcon, href: '/dashboard' },
  { name: 'Profile', icon: SettingsIcon, href: '/dashboard/profile' },
  { name: 'Add Book', icon: AddIcon, href: '/dashboard/createbook' },
  { name: 'Logout', icon: UnlockIcon, href: '/dashboard/logout' },
]

const SidebarContent = ({ onClose, ...rest }) => {
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
      {LinkItems.map((link) => (
        <Link key={link.name} to={link.href}>
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        </Link>
      ))}
    </Box>
  )
}

export default SidebarContent