import { MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

function GroupMemberModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <MenuItem onClick={onOpen}/>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Text</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupMemberModal