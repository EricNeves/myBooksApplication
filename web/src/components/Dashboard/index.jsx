import { useDisclosure } from '@chakra-ui/react'
import SideBar from './SideBar'
import SidebarContent from './SideBarContent'

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <SideBar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <SidebarContent onClose={onClose} />
    </>
  )
}






