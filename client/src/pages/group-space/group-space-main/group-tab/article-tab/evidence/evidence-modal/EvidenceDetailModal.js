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

const EvidenceDetailModal = ({ isOpen, onClose, content, title, img }) => {
    return (
        <div className="EvidenceDetailModal">
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader> {/* 제목 */}
                    <ModalCloseButton />
                    <ModalBody>
                        {content} {/* 내용 */}
                        {img && <img src={img} alt={title} />}{" "}
                        {/* 이미지를 렌더링 */}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            닫기
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default EvidenceDetailModal;
