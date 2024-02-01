import React from "react";
import { useRecoilState } from "recoil";
import { testimonyData } from "contexts/Article";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Textarea,
} from "@chakra-ui/react";

const TestimonyCreateModal = ({ isOpen, onClose, onSave }) => {
    const [data, setData] = useRecoilState(testimonyData);

    const handleSave = () => {
        onSave(data);
        onClose();
        setData({ title: "", content: "" });
    };

    return (
        <div className="TestimonyCreateModal">
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>증언 생성</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="제목"
                            value={data.title}
                            onChange={(e) =>
                                setData({ ...data, title: e.target.value })
                            }
                        />
                        <Textarea
                            placeholder="내용"
                            value={data.content}
                            onChange={(e) =>
                                setData({ ...data, content: e.target.value })
                            }
                            mt={4}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSave}>
                            저장
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            닫기
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default TestimonyCreateModal;
