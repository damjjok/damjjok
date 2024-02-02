import React, { useState } from "react";
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
import TestimonyCreateAlert from "../testimony-alert/TestimonyCreateAlert";

const TestimonyCreateModal = ({ isOpen, onClose, onSave }) => {
    const [data, setData] = useRecoilState(testimonyData);

    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const handleSaveClick = () => {
        setIsAlertOpen(true); // Alert 대화 상자 열기
    };

    const handleConfirmSave = () => {
        onSave(data); // 실제 저장 로직 실행
        setData({ title: "", content: "" }); // 데이터 초기화
        onClose(); // 모달 닫기
        setIsAlertOpen(false); // Alert 대화 상자 닫기
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
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={handleSaveClick}
                        >
                            저장
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            닫기
                        </Button>
                    </ModalFooter>
                </ModalContent>

                <TestimonyCreateAlert
                    isOpen={isAlertOpen}
                    onClose={() => setIsAlertOpen(false)}
                    onConfirm={handleConfirmSave}
                />
            </Modal>
        </div>
    );
};

export default TestimonyCreateModal;
