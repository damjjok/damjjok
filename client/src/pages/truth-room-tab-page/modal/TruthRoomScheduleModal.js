import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    Wrap,
} from "@chakra-ui/react";

const TruthRoomScheduleModal = ({ isOpen, onClose }) => {
    return (
        <>
            <Modal isOpen={isOpen}>
                <ModalOverlay></ModalOverlay>
                <ModalContent width={"30vw"}>
                    <ModalHeader>
                        <Text>진실의 방 일정잡기</Text>
                    </ModalHeader>
                    <ModalBody>
                        <Wrap height={"15vh"}>
                            <Flex
                                alignItems={"center"}
                                justifyContent={"center"}
                                flexDirection={"column"}
                                gap={"3"}
                            >
                                <Wrap>
                                    <Flex
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                    >
                                        <NumberInput
                                            defaultValue={2024}
                                            min={2024}
                                            max={2025}
                                            width={"6vw"}
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
                                            width={"5vw"}
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
                                            width={"5vw"}
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
                                    onClick={onClose}
                                >
                                    설정하기
                                </Button>
                            </Flex>
                        </Wrap>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default TruthRoomScheduleModal;
