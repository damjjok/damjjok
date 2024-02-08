import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import BasicButton from "components/button/BasicButton";
import React from "react";
import postboxSented from "assets/gifs/postbox-unscreen.gif";
// import { useRecoilValue } from "recoil";
// import { currentGroupState } from "contexts/User";
// import { useNavigate } from "react-router-dom";

function RewardBoxSendAlert() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    // const currentGroup = useRecoilValue(currentGroupState);
    // const navigate = useNavigate();
    return (
        <>
            <BasicButton
                onClick={onOpen}
                buttonName={"메시지 보내기"}
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
                            전송 완료
                        </AlertDialogHeader>

                        <AlertDialogBody className="h-full flex flex-col justify-center items-center">
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex bg-damyellow rounded-full w-[100px] h-[100px]">
                                    <img
                                        src={postboxSented}
                                        alt="postboxSented"
                                        className="py-2 w-fit h-fit"
                                    />
                                </div>
                                <p className="text-center font-bold">
                                    메시지 전송이 완료되었습니다!
                                </p>
                            </div>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            {/* <BasicButton
                                onClick={() => {
                                    // navigate(`/group/${currentGroup.groupId}`);
                                    // 라우팅 정리 후에, reward 탭으로 연결시켜 줄 것.
                                    onClose();
                                }}
                                buttonName={"닫기"}
                                variant={"cancel"}
                            /> */}
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}

export default RewardBoxSendAlert;
