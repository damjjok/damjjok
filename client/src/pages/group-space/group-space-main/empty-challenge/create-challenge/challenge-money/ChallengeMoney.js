import {
    // useDisclosure,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Text,
    NumberInput,
    NumberInputField,
    FormErrorMessage,
    useBreakpointValue,
    Box,
    Flex,
} from "@chakra-ui/react";
import { createChallengeState } from "contexts/Challenge";
import { useRecoilState } from "recoil";

function ChallengeMoney() {
    const [challenge, setChallenge] = useRecoilState(createChallengeState);

    const isMobile = useBreakpointValue({ base: true, md: false });
    const isErrorInitialMoney = challenge.initialMoney < 0;
    const isErrorSavedPeriod = challenge.savedPeriod < 0;
    const isErrorSavedMoney = challenge.savedMoney < 0;
    const handleInputChange = (name) => (value) => {
        // const { name, value } = e.target;
        const numericValue = value === "" ? "" : Number(value);

        setChallenge((oldChallenge) => ({
            ...oldChallenge,
            [name]: numericValue,
        }));
    };
    const isError = challenge.duration < 0;
    return (
        <Box display={"flex"} flexFlow={"column"} mt={10} mb={4}>
            <Text fontSize={"x-large"} fontWeight={700}>
                금연 저금통 설정
            </Text>
            <Flex
                flexFlow={"column"}
                alignItems={"center"}
                width={isMobile ? "80vw" : "60vw"}
            >
                <FormControl
                    isInvalid={isErrorInitialMoney}
                    className="flex flex-col my-4 min-w-lg max-w-lg"
                >
                    <div className="flex items-end px-4">
                        <FormLabel fontSize={"md"} fontWeight={"semibold"}>
                            초기금액
                        </FormLabel>
                        <NumberInput
                            min={0}
                            name="initialMoney"
                            type="number"
                            onChange={handleInputChange("initialMoney")}
                            focusBorderColor="dam.yellow"
                            placeholder="단위(원)"
                            htmlSize={16}
                            width="auto"
                        >
                            <NumberInputField
                                width={isMobile ? "30vw" : "none"}
                            />
                        </NumberInput>
                        <FormLabel ml={2}>원</FormLabel>
                    </div>
                    <FormHelperText fontSize={"x-small"} textAlign={"center"}>
                        처음 설정할 금액을 정해주세요. 0원도 괜찮아요!
                    </FormHelperText>
                </FormControl>
                <FormControl
                    isInvalid={isErrorSavedPeriod}
                    className="flex flex-col my-4 min-w-lg max-w-lg"
                >
                    <Box my={4}>
                        <div className="flex items-end px-4">
                            <FormLabel fontSize={"md"} fontWeight={"semibold"}>
                                적립주기
                            </FormLabel>
                            <NumberInput
                                min={0}
                                name="savedPeriod"
                                type="number"
                                onChange={handleInputChange("savedPeriod")}
                                placeholder="단위(일)"
                                htmlSize={16}
                                width="auto"
                            >
                                <NumberInputField
                                    width={isMobile ? "30vw" : "none"}
                                />
                            </NumberInput>
                            <FormLabel ml={2}>일</FormLabel>
                        </div>
                        <FormHelperText
                            fontSize={"x-small"}
                            textAlign={"center"}
                        >
                            금액 주기를 설정해주세요. 주기마다 적금처럼 포인트가
                            쌓여요.
                        </FormHelperText>
                    </Box>
                </FormControl>
                <FormControl
                    isInvalid={isErrorSavedMoney}
                    className="flex flex-col justify-center my-4 min-w-lg max-w-lg"
                >
                    <div className="flex items-end px-4">
                        <FormLabel fontSize={"md"} fontWeight={"semibold"}>
                            적립금액
                        </FormLabel>
                        <NumberInput
                            min={0}
                            name="savedMoney"
                            type="number"
                            onChange={handleInputChange("savedMoney")}
                            placeholder="단위(원)"
                            htmlSize={16}
                        >
                            <NumberInputField
                                width={isMobile ? "30vw" : "none"}
                            />
                        </NumberInput>

                        <FormLabel ml={2}>원</FormLabel>
                    </div>
                    <FormHelperText fontSize={"x-small"} textAlign={"center"}>
                        선택한 주기마다 넣을 금액을 설정해주세요. 0원도
                        가능해요!
                    </FormHelperText>
                </FormControl>
            </Flex>
        </Box>
    );
}

export default ChallengeMoney;
