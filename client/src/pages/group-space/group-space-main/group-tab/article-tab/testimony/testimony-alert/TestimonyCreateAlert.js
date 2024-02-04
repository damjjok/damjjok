// TestimonyCreateAlert.js
import React from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    Flex,
} from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

const TestimonyCreateAlert = ({ isOpen, onClose, onConfirm }) => {
    const cancelRef = React.useRef();

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        <Flex
                            justifyContent="center"
                            alignItems="center"
                            width="100%"
                        >
                            <WarningTwoIcon color="#ffd100" boxSize="50px" />{" "}
                            {/* 아이콘 크기 조정 */}
                        </Flex>
                    </AlertDialogHeader>

                    <AlertDialogBody textAlign="center">
                        작성한 증언은 삭제할 수 없습니다!
                        <br />
                        제출하면 담쪽이에게 알림이 가고, <br />
                        진실의 방 오픈 일정을 잡게 됩니다.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Flex justifyContent="center" width="full">
                            <Button
                                colorScheme="yellow"
                                onClick={onConfirm}
                                mr={3}
                            >
                                제출
                            </Button>
                            <Button ref={cancelRef} onClick={onClose}>
                                취소
                            </Button>
                        </Flex>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default TestimonyCreateAlert;
