import { Flex, Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import BasicButton from "components/button/BasicButton"


function MessageCheckModal({nextContent}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
      <>
                    <ModalBody>
                        <p className=" font-extrabold text-4xl text-center">리폿</p>
                        <p className="font-semibold text-center">성공한 챌린지의 리포트를 확인할 수 있어요!</p>
                    </ModalBody>
                    <BasicButton buttonName={'리포트 확인하기'} variant={'bigbtn'}/>
      </>
  )
}

export default MessageCheckModal