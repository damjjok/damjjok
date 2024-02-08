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
                            <Text>
                                정말로 챌린지를 생성하시겠습니까? 생성하신
                                후에는 도전 내용을 변경할 수 없습니다.
                            </Text>
                            <Box>
                                <Heading>챌린지 정보</Heading>
                                <VStack>
                                    <Text>
                                        챌린지 기간 : {challenge.duration} 일
                                    </Text>
                                    <Text>
                                        시작 금액 : {challenge.initialMoney} 원
                                    </Text>
                                    <Text>
                                        적립 주기 : {challenge.savedPeriod} 일
                                    </Text>
                                    <Text>
                                        적립 금액 : {challenge.savedMoney} 원
                                    </Text>
                                </VStack>
                            </Box>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <ChallengeCreateModal />
                            <BasicButton
                                onClick={onClose}
                                buttonName={"취소"}
                                variant={"cancel"}
                            />
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}

export default ChallengeCreateAlert;
