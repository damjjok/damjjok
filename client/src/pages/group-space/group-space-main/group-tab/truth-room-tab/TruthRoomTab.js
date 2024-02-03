import {
    Box,
    Button,
    Flex,
    FormLabel,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    Wrap,
} from "@chakra-ui/react";

function TruthRoomTab() {
    return (
        <>
            <Flex justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
                <Box width={"100%"} height={"30vh"} bg={"dam.gray"} marginTop={"5%"} borderRadius={"30px"}>
                    <Flex flexDirection={"column"} justifyContent={"space-around"} alignItems={"center"} height={"100%"}>
                        <Text fontWeight={"700"} fontSize={"1.5rem"} color={"white"}>
                            담쪽이가 일정을 정하고 있습니다.
                        </Text>
                        <Text fontWeight={"700"} fontSize={"1.5rem"} color={"white"}>
                            진실의 방 오픈 : 2024년 2월 16일
                        </Text>
                        <Text fontWeight={"700"} fontSize={"1.5rem"} color={"white"}>
                            진실의 방 오픈일 설정
                        </Text>
                        <Wrap>
                            <Flex alignItems={"center"} justifyContent={"center"} gap={"3"}>
                                <NumberInput defaultValue={2024} min={2024} max={2025} width={"15%"}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <FormLabel fontSize={"1.5rem"}>년</FormLabel>
                                <NumberInput defaultValue={1} min={1} max={12} width={"10%"}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <FormLabel fontSize={"1.5rem"}>월</FormLabel>
                                <NumberInput defaultValue={1} min={1} max={31} width={"10%"}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <FormLabel fontSize={"1.5rem"}>일</FormLabel>
                            </Flex>
                        </Wrap>
                        <Button bg={"dam.yellow"} size={"sm"}>
                            설정하기
                        </Button>
                    </Flex>
                </Box>
                <Wrap>
                    <Button bg={"dam.yellow"} marginTop={"10%"} size={"lg"}>
                        진실의 방 입장하기
                    </Button>
                </Wrap>
            </Flex>
        </>
    );
}

export default TruthRoomTab;
