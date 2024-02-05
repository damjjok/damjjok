import {
    Box,
    Button,
    Flex,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    Wrap,
    useDisclosure,
} from "@chakra-ui/react";

function TruthRoomTab() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Flex
                justifyContent={"center"}
                flexDirection={"column"}
                alignItems={"center"}
            >
                <Box
                    width={"100%"}
                    height={"30vh"}
                    bg={"dam.gray"}
                    marginTop={"5%"}
                    borderRadius={"30px"}
                >
                    <Flex
                        flexDirection={"column"}
                        justifyContent={"space-around"}
                        alignItems={"center"}
                        height={"100%"}
                    >
                        <Text
                            fontWeight={"700"}
                            fontSize={"1.5rem"}
                            color={"white"}
                        >
                            담쪽이가 일정을 정하고 있습니다.
                        </Text>
                        <Text
                            fontWeight={"700"}
                            fontSize={"1.5rem"}
                            color={"white"}
                        >
                            진실의 방 오픈 : 2024년 2월 16일
                        </Text>
                        <Text
                            fontWeight={"700"}
                            fontSize={"1.5rem"}
                            color={"white"}
                        >
                            진실의 방 오픈일 설정
                        </Text>
                        <Wrap>
                            <Flex
                                alignItems={"center"}
                                justifyContent={"center"}
                                gap={"3"}
                            >
                                <NumberInput
                                    defaultValue={2024}
                                    min={2024}
                                    max={2025}
                                    width={"15%"}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <Text fontSize={"1.5rem"}>년</Text>
                                <NumberInput
                                    defaultValue={1}
                                    min={1}
                                    max={12}
                                    width={"10%"}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <Text fontSize={"1.5rem"}>월</Text>
                                <NumberInput
                                    defaultValue={1}
                                    min={1}
                                    max={31}
                                    width={"10%"}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <Text fontSize={"1.5rem"}>일</Text>
                            </Flex>
                        </Wrap>
                        <Button
                            bg={"dam.yellow"}
                            size={"sm"}
                            borderRadius={"30px"}
                        >
                            설정하기
                        </Button>
                    </Flex>
                </Box>
                <Wrap>
                    <Button
                        bg={"dam.yellow"}
                        marginTop={"10%"}
                        size={"lg"}
                        onClick={onOpen}
                        borderRadius={"30px"}
                    >
                        진실의 방 입장하기
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalBody textAlign={"center"}>
                                <Flex
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    height={"15vh"}
                                >
                                    <Text fontSize={"1.3rem"} fontWeight={600}>
                                        진실의 방에 입장하시겠습니까?
                                    </Text>
                                </Flex>
                            </ModalBody>

                            <Flex justifyContent={"center"}>
                                <Button
                                    bg={"dam.yellow"}
                                    onClick={onClose}
                                    margin={"5%"}
                                >
                                    입장하기
                                </Button>
                                <Button
                                    bg={"dam.gray"}
                                    margin={"5%"}
                                    onClick={onClose}
                                >
                                    취소
                                </Button>
                            </Flex>
                        </ModalContent>
                    </Modal>
                </Wrap>
            </Flex>
        </>
    );
}

export default TruthRoomTab;
