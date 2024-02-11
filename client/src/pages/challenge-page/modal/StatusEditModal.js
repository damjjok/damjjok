import { EditIcon } from "@chakra-ui/icons";
import {
    Button,
    Editable,
    EditableInput,
    EditablePreview,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import BasicButton from "components/button/BasicButton";
import React, { useState } from "react";
import AvatarSelector from "./AvatarSelector";
import { useRecoilState } from "recoil";
import { challengeStatusState } from "contexts/Challenge";
import { patchChallengeStatus } from "apis/api/Challenge";

function StatusEditModal({ currentChallenge, selectedAvatar }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentStatus, setStatus] = useRecoilState(challengeStatusState);
    const [inputValue, setInputValue] = useState(
        currentChallenge.determination
    );
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    return (
        <>
            <Button bg={"dam.gray"} position={"static"}>
                <EditIcon onClick={onOpen} />
            </Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <p>챌린지 정보 수정하기</p>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl pb={6}>
                            <FormLabel>챌린지 프로필 선택</FormLabel>
                            <AvatarSelector />
                        </FormControl>

                        <p>나의 한 마디 수정</p>
                        <Editable
                            defaultValue={`${currentChallenge.determination}`}
                        >
                            <EditablePreview />
                            <EditableInput
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </Editable>
                    </ModalBody>

                    <ModalFooter>
                        <BasicButton
                            buttonName={"수정하기"}
                            onClick={() => {
                                //수정사항 반영 로직 작성
                                patchChallengeStatus(
                                    currentChallenge.challengeId,
                                    inputValue,
                                    currentStatus.imagePath
                                );
                                setStatus({
                                    determination: inputValue,
                                });
                                onClose();
                            }}
                        />
                        <BasicButton
                            onClick={onClose}
                            buttonName={"취소"}
                            variant={"cancel"}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default StatusEditModal;
