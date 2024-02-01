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

const TestimonyDetailModal = ({ isOpen, onClose, content,title }) => {
    
    return(
    <div className="TestimonyDetailModal">
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader> {/* 제목 */}
                <ModalCloseButton />
                <ModalBody>
                    {content} {/* 내용 */}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        닫기
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        ₩
    </div>)
};

export default TestimonyDetailModal;
