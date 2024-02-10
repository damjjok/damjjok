import { useState } from "react";
import RewardBoxSendAlert from "./RewardBoxSendAlert";
import { postCheerMessage } from "apis/api/CheerMsg";
import { useRecoilValue } from "recoil";
import { challengeState } from "contexts/Challenge";

const {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Input,
    FormControl,
    FormLabel,
    FormHelperText,
} = require("@chakra-ui/react");
const { default: BasicButton } = require("components/button/BasicButton");

function RewardBoxModal() {
    const { isOpen, onOpen, onClose: rawOnClose } = useDisclosure();
    const [inputValue, setInputValue] = useState("");
    const [confirmedInputValue, setConfirmedInputValue] = useState("");
    const challenge = useRecoilValue(challengeState);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleConfirm = () => {
        setConfirmedInputValue(inputValue); // 확인 버튼을 눌렀을 때 confirmedInputValue를 업데이트합니다.
        postCheerMessage(challenge.challengeId, confirmedInputValue);
        onClose();
    };

    // 닫을 때 input 초기화
    const onClose = () => {
        setInputValue(""); // 모달을 닫을 때 Input을 초기화합니다.
        rawOnClose();
    };
    return (
        <div>
            <BasicButton
                onClick={onOpen}
                variant={"bigbtn"}
                buttonName={"담쪽이 응원하기"}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody className="mt-16 px-8">
                        <div className="mb-8">
                            <p className="text-2xl font-bold text-center">
                                담쪽이를 응원해요!
                            </p>
                            <p className="text-center">
                                응원 메시지로 담쪽이를 응원해봐요
                            </p>
                        </div>
                        <FormControl>
                            <FormLabel>
                                <p className="font-bold">응원 메시지</p>
                            </FormLabel>
                            <Input
                                type="message"
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                            <FormHelperText>
                                담쪽이의 성공적인 챌린지를 응원해요!
                            </FormHelperText>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <BasicButton
                            onClick={handleConfirm} // 응원 메시지 작성 후 확인 버튼 클릭 시 RewardBoxModal 모달을 닫습니다.
                            variant={"bigbtn"}
                            buttonName={"메시지 보내기"}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {confirmedInputValue && (
                <RewardBoxSendAlert inputValue={confirmedInputValue} />
            )}
        </div>
    );
}

export default RewardBoxModal;
