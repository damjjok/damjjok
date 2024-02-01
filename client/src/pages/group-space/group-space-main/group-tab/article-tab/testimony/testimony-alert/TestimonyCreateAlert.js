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
} from "@chakra-ui/react";

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
                        여기 대충 이모티콘 해야할듯
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        작성한 증언은 삭제할 수 없습니다!
                        <br />
                        제출하면 담쪽이에게 알림이 가고, <br />
                        진실의 방 오픈 일정을 잡게 됩니다.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            취소
                        </Button>
                        <Button colorScheme="blue" onClick={onConfirm} ml={3}>
                            저장
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default TestimonyCreateAlert;
