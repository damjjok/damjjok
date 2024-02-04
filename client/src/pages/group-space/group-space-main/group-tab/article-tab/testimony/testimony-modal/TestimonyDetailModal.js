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
    Box,
    Text,
} from "@chakra-ui/react";

const TestimonyDetailModal = ({ isOpen, onClose, content, title }) => {
    // 추후에 데이터 연결되면 바꿀 예정
    const person = "문지호";
    const day = "2024년 2월 11일 13:00";

    return (
        <div className="TestimonyDetailModal">
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
                    <ModalCloseButton />
                    <ModalBody>
                        <Box
                            textAlign="right"
                            mb={7}
                            borderBottom="2px"
                            borderColor="#ffd100"
                        >
                            <Text fontSize="xl" fontWeight="bold">
                                제보자: {person}
                            </Text>
                            <Text>작성 시각: {day}</Text>
                        </Box>
                        <Box>{content}</Box> {/* 내용 */}
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

export default TestimonyDetailModal;
