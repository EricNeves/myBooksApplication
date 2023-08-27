import { useDisclosure } from '@chakra-ui/react'
import SidebarContent from './SideBarContent'

export default function Dashboard() {
  const { onClose } = useDisclosure()
  return (
    <>
      <SidebarContent onClose={onClose} />
    </>
  )
}






