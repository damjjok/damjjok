import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from "@chakra-ui/react";

const EvidenceCreateModal = ({ isOpen, onClose }) => {
    return (
        <div className="EvidenceCreateModal">
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>증거 생성</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{/* 여기에 모달 내용 */}</ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            닫기
                        </Button>
                        <Button variant="ghost">저장</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default EvidenceCreateModal;
