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
import { useState } from "react";

const TruthRoomScheduleModal = ({ isOpen, onClose, handler }) => {
    const [date, setDate] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
    });
    return (
        <>
            <Modal isOpen={isOpen}>
                <ModalOverlay></ModalOverlay>
                <ModalContent width={"30vw"}>
                    <ModalHeader>
                        <Text>진실의 방 일정잡기</Text>
                    </ModalHeader>
                    <ModalBody>
                        <Flex alignItems={"center"} justifyContent={"center"} height={"15vh"}>
                            <Flex alignItems={"center"} justifyContent={"center"} flexDirection={"column"} gap={"3"}>
                                <Wrap>
                                    <Flex justifyContent={"center"} alignItems={"center"}>
                                        <NumberInput
                                            defaultValue={date.year}
                                            min={2024}
                                            max={2025}
                                            width={"6vw"}
                                            onChange={(valueString, valueNumber) => {
                                                setDate({
                                                    ...date,
                                                    year: valueNumber,
                                                });
                                            }}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        <Text fontSize={"1.5rem"}>년</Text>
                                        <NumberInput
                                            defaultValue={date.month}
                                            min={1}
                                            max={12}
                                            width={"5vw"}
                                            onChange={(valueString, valueNumber) => {
                                                setDate({
                                                    ...date,
                                                    month: valueNumber,
                                                });
                                            }}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        <Text fontSize={"1.5rem"}>월</Text>
                                        <NumberInput
                                            defaultValue={date.day}
                                            min={1}
                                            max={31}
                                            width={"5vw"}
                                            onChange={(valueString, valueNumber) => {
                                                setDate({
                                                    ...date,
                                                    day: valueNumber,
                                                });
                                            }}
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
                                <Wrap>
                                    <Button
                                        bg={"dam.yellow"}
                                        size={"sm"}
                                        borderRadius={"30px"}
                                        onClick={() => {
                                            handler(new Date(date.year, date.month - 1, date.day));
                                        }}
                                    >
                                        설정하기
                                    </Button>
                                    <Button
                                        size={"sm"}
                                        borderRadius={"30px"}
                                        onClick={() => {
                                            onClose();
                                        }}
                                    >
                                        닫기
                                    </Button>
                                </Wrap>
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default TruthRoomScheduleModal;
