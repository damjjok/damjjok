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
} from "@chakra-ui/react";

import BasicButton from "../../../../../../components/button/BasicButton"
import ChallengeCreateModal from "./ChallengeCreateModal";

function ChallengeCreateAlert() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

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
                            정말로 챌린지를 생성하시겠습니까? 생성하신 후에는
                            도전 내용을 변경할 수 없습니다.
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
