import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent
} from '@chakra-ui/react'

import SidebarContent from './SideBarContent'
import MobileNav from './MobileNav'
import ContentHome from './ContentHome'

const SideBar = ({ isOpen, onOpen, onClose }) => {
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <ContentHome />
      </Box>
    </Box>
  )
}

export default SideBar