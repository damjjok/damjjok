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
    Flex,
} from "@chakra-ui/react";
import TestimonyCreateAlert from "./TestimonyCreateAlert";
import { postTestimony } from "apis/api/Challenge";
import { useParams } from "react-router-dom";

const TestimonyCreateModal = ({ isOpen, onClose, onSave }) => {
    const { challengeId } = useParams();

    const [newTestimony, setNewTestimony] = useState({});

    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const handleSaveClick = () => {
        setIsAlertOpen(true); // Alert 대화 상자 열기
    };

    const handleConfirmSave = () => {
        onSave(newTestimony);
        setNewTestimony({});
        onClose(); // 모달 닫기
        setIsAlertOpen(false); // Alert 대화 상자 닫기
    };

    return (
        <div className="TestimonyCreateModal">
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>증언 제출하기</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            variant="flushed"
                            placeholder="제목"
                            value={newTestimony.title}
                            onChange={(e) =>
                                setNewTestimony({
                                    ...newTestimony,
                                    title: e.target.value,
                                })
                            }
                            _focus={{
                                borderBottom: "2px solid #ffd110", // 포커스 시 선 색상 변경
                                boxShadow: "none", // 기본 테마의 포커스 boxShadow 제거
                            }}
                        />
                        <Textarea
                            placeholder="내용을 입력해주세요"
                            value={newTestimony.content}
                            onChange={(e) =>
                                setNewTestimony({
                                    ...newTestimony,
                                    content: e.target.value,
                                })
                            }
                            mt={4}
                            size="lg"
                            height="200px"
                            _focus={{
                                border: "2px solid #ffd110", // 포커스 시 선 색상 변경
                                boxShadow: "none", // 기본 테마의 포커스 boxShadow 제거
                            }}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Flex justifyContent="center" width="full">
                            <Button
                                colorScheme="yellow"
                                mr={3}
                                onClick={handleSaveClick}
                            >
                                저장
                            </Button>
                            <Button variant="ghost" onClick={onClose}>
                                닫기
                            </Button>
                        </Flex>
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
