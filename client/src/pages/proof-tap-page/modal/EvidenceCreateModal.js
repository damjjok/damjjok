import React, { useState } from "react";
import { useRecoilState } from "recoil";
import EXIF from "exif-js";
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
    FormControl,
    FormLabel,
    Flex,
    Box,
    Image,
    Text,
} from "@chakra-ui/react";
import EvidenceCreateAlert from "./EvidenceCreateAlert";

const EvidenceCreateModal = ({ isOpen, onClose, onSave }) => {
    const [data, setData] = useRecoilState(evidenceData);
    const [newEvidence, setNewEvidence] = useState({});
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(""); // 미리보기 이미지 상태

    const handleSaveClick = () => {
        setIsAlertOpen(true); // Alert 대화 상자 열기
        console.log(newEvidence);
    };

    const handleConfirmSave = () => {
        onSave(newEvidence); // 실제 저장 로직 실행
        setNewEvidence({ title: "", image: null }); // 데이터 초기화
        onClose(); // 모달 닫기
        setIsAlertOpen(false); // Alert 대화 상자 닫기
        setPreviewImage(""); // 미리보기 이미지 초기화
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                // 미리보기 이미지 상태를 업데이트하고
                // 파일 데이터를 data.img에도 저장합니다.
                // setData({
                //     ...data,
                //     img: reader.result, // 여기서 reader.result를 data.img에 저장합니다.
                //     title: data.title,
                // });

                // setNewEvidence({
                //     ...newEvidence,
                //     image: file,
                // });

                setPreviewImage(reader.result); // 미리보기 이미지 상태를 업데이트
                EXIF.getData(file, function () {
                    let dateTimeOriginal = EXIF.getTag(
                        this,
                        "DateTimeOriginal",
                    );
                    console.log("EXIF DateTimeOriginal:", dateTimeOriginal); // 원본 날짜 값 로깅

                    if (dateTimeOriginal) {
                        // "YYYY:MM:DD HH:MM:SS" 형식을 "YYYY-MM-DDTHH:MM:SS"로 변환
                        const formattedDateTime =
                            dateTimeOriginal
                                .replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3")
                                .replace(" ", "T") + ".000Z"; // UTC 시간을 나타내는 'Z'를 추가합니다.

                        console.log("Formatted DateTime:", formattedDateTime); // 변환된 날짜 값 로깅

                        try {
                            const date = new Date(formattedDateTime);
                            if (!isNaN(date)) {
                                dateTimeOriginal = date.toISOString();
                            } else {
                                throw new Error("Invalid date format");
                            }
                        } catch (error) {
                            console.error("Date conversion error:", error);
                            dateTimeOriginal = new Date().toISOString(); // 에러가 발생하면 현재 날짜로 대체
                        }
                    } else {
                        dateTimeOriginal = new Date().toISOString(); // dateTimeOriginal이 없으면 현재 날짜 사용
                    }

                    setNewEvidence((prev) => ({
                        ...prev,
                        image: file,
                        imageDate: dateTimeOriginal,
                    }));
                });
            };
            reader.readAsDataURL(file);
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
                            <Input
                                variant="flushed"
                                placeholder="제목"
                                value={newEvidence.title}
                                onChange={(e) =>
                                    setNewEvidence({
                                        ...newEvidence,
                                        title: e.target.value,
                                    })
                                }
                                _focus={{
                                    borderBottom: "2px solid #ffd110", // 포커스 시 선 색상 변경
                                    boxShadow: "none", // 기본 테마의 포커스 boxShadow 제거
                                }}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <Box
                                as="label" // Box를 label 역할로 사용
                                htmlFor="file-upload" // input과 연결
                                border="2px dashed #CBD5E0" // 점선 테두리 스타일
                                borderRadius="md"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                cursor="pointer"
                                textAlign="center"
                                flexDirection="column"
                                height={previewImage ? "" : "200px"} // 적당한 높이 설정
                                overflow="hidden" // 내부 이미지가 박스를 넘치지 않도록
                                p={1}
                            >
                                {previewImage ? (
                                    <Image
                                        src={previewImage}
                                        alt="미리보기 이미지"
                                        // maxH="100%"
                                        maxW="100%"
                                        m="auto"
                                    />
                                ) : (
                                    <Text
                                        fontSize="lg"
                                        fontWeight="bold"
                                        color="gray.500"
                                    >
                                        + 사진 추가
                                    </Text>
                                )}
                            </Box>
                            <Input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                display="none" // 실제 input은 숨김
                            />
                        </FormControl>
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
