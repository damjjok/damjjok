import { EditIcon } from "@chakra-ui/icons"
import { Editable, EditableInput, EditablePreview, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import BasicButton from "components/button/BasicButton"
import React from "react"

function StatusEditModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
      <EditIcon onClick={onOpen}/>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <p>챌린지 정보 수정하기</p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl pb={6}>
              <FormLabel>챌린지 프로필 선택</FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>

            <p>나의 한 마디 수정</p>
            <Editable
              defaultValue={`${props.currentChallenge.determination}`}>
              <EditablePreview/>
              <EditableInput/>
            </Editable>
          </ModalBody>

          <ModalFooter>
            <BasicButton buttonName={'수정하기'}/>
            <BasicButton onClick={onClose} buttonName={'닫기'} variant={'cancel'}/>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default StatusEditModal