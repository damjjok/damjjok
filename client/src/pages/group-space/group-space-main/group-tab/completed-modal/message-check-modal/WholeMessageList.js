import { Box, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react"

function WholeMessageList() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
  <>
  <Text onClick={onOpen} className="font-bold cursor-pointer underline underline-offset-4">전체 응원메시지 보기</Text>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>
      <p className=" font-extrabold">
        모든 응원 메시지 보기
      </p>
    </ModalHeader>
    <ModalCloseButton />
    <ModalBody py={10} px={20}>
      <Box marginBottom={4}>
        <p className="text-xl font-bold py-4">담쪽이</p>
        <VStack alignItems={'start'} px={10}>
          <Box py={2}>
            <Flex alignItems={'center'}>
              <Text>텍스트</Text>

            </Flex>
          </Box>
        </VStack>
      </Box>
    </ModalBody>
  </ModalContent>
</Modal>
  </>
  )
}

export default WholeMessageList