import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { evidenceData } from "contexts/Article";
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
    FormControl,
    FormLabel,
} from "@chakra-ui/react";
import EvidenceCreateAlert from "../evidence-alert/EvidenceCreateAlert";

const EvidenceCreateModal = ({ isOpen, onClose, onSave }) => {
    const [data, setData] = useRecoilState(evidenceData);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const handleSaveClick = () => {
        setIsAlertOpen(true); // Alert 대화 상자 열기
    };

    const handleConfirmSave = () => {
        onSave(data); // 실제 저장 로직 실행
        setData({ title: "", content: "", img: null }); // 데이터 초기화
        onClose(); // 모달 닫기
        setIsAlertOpen(false); // Alert 대화 상자 닫기
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file); // 파일 객체로부터 URL 생성
            setData({
                ...data,
                img: imageUrl, // 생성된 URL을 상태에 저장
            });
        }
    };

    return (
        <div className="EvidenceCreateModal">
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>증거 생성</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>제목</FormLabel>
                            <Input
                                placeholder="제목"
                                value={data.title}
                                onChange={(e) =>
                                    setData({ ...data, title: e.target.value })
                                }
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>내용</FormLabel>
                            <Textarea
                                placeholder="내용"
                                value={data.content}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        content: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>이미지 업로드</FormLabel>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </FormControl>
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

                <EvidenceCreateAlert
                    isOpen={isAlertOpen}
                    onClose={() => setIsAlertOpen(false)}
                    onConfirm={handleConfirmSave}
                />
            </Modal>
        </div>
    );
};

export default EvidenceCreateModal;
