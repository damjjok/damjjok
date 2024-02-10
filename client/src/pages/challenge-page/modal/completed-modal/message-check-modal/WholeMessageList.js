import {
    Box,
    Divider,
    Flex,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";

function WholeMessageList({ messages }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Text
                onClick={onOpen}
                className="font-bold cursor-pointer underline underline-offset-4"
            >
                전체 응원메시지 보기
            </Text>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <p className=" font-extrabold">모든 응원 메시지 보기</p>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box marginBottom={4}>
                            <VStack
                                alignItems={"start"}
                                px={10}
                                style={{
                                    maxHeight: "500px", // 최대 높이 설정
                                    overflow: "auto", // 내용이 넘치는 경우에만 스크롤바 생성
                                }}
                            >
                                {messages.map((message, index) => {
                                    return (
                                        <Box key={index}>
                                            <Flex
                                                flexFlow={"column"}
                                                paddingY={4}
                                            >
                                                <Heading size="md">
                                                    {message.userName}
                                                </Heading>
                                                <Text>{message.content}</Text>
                                                <Text fontSize={"xx-small"}>
                                                    {message.createdAt}
                                                </Text>
                                            </Flex>
                                            <Divider />
                                        </Box>
                                    );
                                })}
                            </VStack>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default WholeMessageList;
