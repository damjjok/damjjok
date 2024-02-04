import { Box, Flex, MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, useDisclosure } from "@chakra-ui/react"
import phDIcon from "assets/images/phDIcon.png"
import damJJokIcon from "assets/images/damJJokIcon.png"

const currentGroupMember = [{name: '손종민', role:'damJJok'}, {name: '최명성', role:'phD'}, { name: '박서현', role:'phD'}, { name: '김다희', role:'phD'}, { name: '김영후', role:'phD'}, { name: '문지호', role:'phD'}]

function GroupMemberModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // find 메서드로 담쪽이 찾기
  const damJJok = currentGroupMember.find(member => member.role === 'damJJok');
  return (
    <>
      <MenuItem onClick={onOpen}>그룹원 보기</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <p className=" font-extrabold">
              그룹원 보기
            </p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={10} px={20}>
            <Box marginBottom={4}>
              <p className="text-xl font-bold py-4">담쪽이</p>
              <VStack alignItems={'start'} px={10}>
                <Box py={2}>
                  <Flex alignItems={'center'}>
                  <img src={damJJokIcon} alt='damJJokIcon' className="w-[25px] mr-2"/>
                  {damJJok && damJJok.name}
                  </Flex>
                </Box>
              </VStack>
            </Box>
            <Box marginY={4}>
              <p className="text-xl font-bold py-4">박사님</p>
              <VStack alignItems={'start'} px={10}>
                {currentGroupMember.filter(member => member.role === 'phD').map((member, index) => (
                  <Box key={index} py={2}>
                    <Flex alignItems={'center'}>
                      <img src={phDIcon} alt='phDIcon' className="w-[30px] mr-2"/>
                      {member.name}

                    </Flex>
                  </Box>
                ))}
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupMemberModal