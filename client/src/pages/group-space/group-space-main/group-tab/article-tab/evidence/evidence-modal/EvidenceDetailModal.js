import React, { useState, useEffect } from "react";

// 사진 메타데이터 라이브러리
import EXIF from "exif-js";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    Text,
} from "@chakra-ui/react";

const EvidenceDetailModal = ({ isOpen, onClose, title, img }) => {
    // 추후에 데이터 연결되면 바꿀 예정
    const person = "문지호";
    const day = "2024년 2월 11일 13:00";
    const pictureday = "";

    const [pictureDate, setPictureDate] = useState("");
    useEffect(() => {
        if (img) {
            const imgObj = new Image();
            imgObj.src = img;
            imgObj.onload = function () {
                EXIF.getData(imgObj, function () {
                    const date = EXIF.getTag(this, "DateTimeOriginal");
                    setPictureDate(date);
                });
            };
        }
    }, [img]);

    return (
        <div className="EvidenceDetailModal">
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent size="xl" minW="500px" minH="500px">
                    <ModalHeader
                        sx={{
                            fontSize: "4xl", // 글씨 크기를 2xl로 설정
                            fontWeight: "bold", // 글씨를 굵게 설정
                        }}
                    >
                        {title}
                    </ModalHeader>{" "}
                    {/* 제목 */}
                    <ModalCloseButton />
                    <ModalBody>
                        <Box
                            textAlign="right"
                            mb={10}
                            borderBottom="2px"
                            borderColor="#ffd100"
                        >
                            <Text fontSize="xl" fontWeight="bold">
                                제보자: {person}
                            </Text>
                            <Text>작성 시각: {day}</Text>
                            {pictureDate && (
                                <Text>사진 촬영 날짜: {pictureDate}</Text>
                            )}
                        </Box>
                        <Box>{img && <img src={img} alt={title} />} </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="yellow" mr={3} onClick={onClose}>
                            닫기
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default EvidenceDetailModal;
