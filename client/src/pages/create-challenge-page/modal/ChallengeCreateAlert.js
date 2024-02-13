import React from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    // AlertDialogCloseButton,
    useDisclosure,
    Text,
    Box,
    Heading,
    VStack,
} from "@chakra-ui/react";

import BasicButton from "../../../components/button/BasicButton";
import ChallengeCreateModal from "./ChallengeCreateModal";
import { useRecoilValue } from "recoil";
import { createChallengeState } from "contexts/Challenge";
import { WarningTwoIcon } from "@chakra-ui/icons";

function ChallengeCreateAlert() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const challenge = useRecoilValue(createChallengeState);

    return (
        <>
            <BasicButton
                onClick={onOpen}
                buttonName={"챌린지 생성하기"}
                variant={"bigbtn"}
            />

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            챌린지 생성하기
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <Box
                                display={"flex"}
                                flexFlow={"column"}
                                alignItems={"center"}
                                mt={10}
                                mb={10}
                            >
                                <WarningTwoIcon
                                    color={"dam.yellow"}
                                    boxSize={"40px"}
                                    mb={4}
                                />
                                <Text>정말로 챌린지를 생성하시겠습니까?</Text>
                                <Text>
                                    생성하신 후에는 도전 내용을 변경할 수
                                    없습니다.
                                </Text>
                            </Box>
                            <Box
                                display={"flex"}
                                justifyContent={"center"}
                                mt={4}
                                mb={2}
                            >
                                <Heading size={"sm"}>
                                    생성할 챌린지 정보
                                </Heading>
                            </Box>
                            <Box>
                                <VStack spacing={4}>
                                    <VStack
                                        border={"2px"}
                                        borderColor={"dam.yellow"}
                                        borderRadius={"2xl"}
                                        p={4}
                                        alignItems={"start"}
                                        spacing={4}
                                    >
                                        <Text>
                                            기간 : {challenge.duration} 일
                                        </Text>
                                        <Text>
                                            시작금액 : {challenge.initialMoney}{" "}
                                            원
                                        </Text>
                                        <Text>
                                            적립주기 : {challenge.savedPeriod}{" "}
                                            일
                                        </Text>
                                        <Text>
                                            적립금액 : {challenge.savedMoney} 원
                                        </Text>
                                    </VStack>
                                </VStack>
                            </Box>
                        </AlertDialogBody>

                        <AlertDialogFooter justifyContent={"center"}>
                            <Box
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                            >
                                <ChallengeCreateModal />
                                <Box ml={4}>
                                    <BasicButton
                                        onClick={onClose}
                                        buttonName={"취소"}
                                        variant={"cancel"}
                                    />
                                </Box>
                            </Box>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}

export default ChallengeCreateAlert;
