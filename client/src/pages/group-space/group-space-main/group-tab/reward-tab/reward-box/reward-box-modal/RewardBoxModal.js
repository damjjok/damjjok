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
    const { isOpen, onOpen, onClose } = useDisclosure();
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
                            <Input type="message" />
                            <FormHelperText>
                                담쪽이의 성공적인 챌린지를 응원해요!
                            </FormHelperText>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>{/*버튼/*/}</ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default RewardBoxModal;
