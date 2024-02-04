import { MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

function GroupInviteModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <MenuItem onClick={onOpen}>멤버 초대하기</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <p className=" font-extrabold">
              멤버 초대하기
            </p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={10} px={20}>
            <p>초대 코드 생성 페이지 그대로 붙여넣기</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupInviteModal