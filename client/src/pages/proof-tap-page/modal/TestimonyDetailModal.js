import React, { useEffect, useState } from "react";
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
import { getTestimonyDetail } from "apis/api/Challenge";

const TestimonyDetailModal = ({ isOpen, onClose, testimonyId }) => {
    const [testimony, setTestimony] = useState({});
    useEffect(() => {
        getTestimonyDetail(testimonyId, setTestimony);
    }, []);
    // 추후에 데이터 연결되면 바꿀 예정

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
                        {testimony.testimonyTitle}
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
                                제보자: {testimony.userName}
                            </Text>
                            <Text>
                                작성 시각:{" "}
                                {new Date(
                                    testimony.createdAt
                                ).toLocaleDateString()}
                            </Text>
                        </Box>
                        <Box>{testimony.testimonyContent}</Box> {/* 내용 */}
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
