import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const TruthRoomEnterModal = ({ isOpen, onClose, groupId, challengeId }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody textAlign={"center"}>
                    <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        height={"15vh"}
                    >
                        <Text fontSize={"1.3rem"} fontWeight={600}>
                            진실의 방에 입장하시겠습니까?
                        </Text>
                    </Flex>
                </ModalBody>

                <Flex justifyContent={"center"}>
                    <Button bg={"dam.yellow"} onClick={onClose} margin={"5%"}>
                        <Link
                            to={`/truth-room/${groupId}/challenge/${challengeId}`}
                        >
                            입장하기
                        </Link>
                    </Button>
                    <Button bg={"dam.gray"} margin={"5%"} onClick={onClose}>
                        취소
                    </Button>
                </Flex>
            </ModalContent>
        </Modal>
    );
};

export default TruthRoomEnterModal;
