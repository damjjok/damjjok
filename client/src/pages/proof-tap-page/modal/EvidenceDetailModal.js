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
    Flex,
} from "@chakra-ui/react";
import { getEvidenceDetail } from "apis/api/Proof";

const EvidenceDetailModal = ({ isOpen, onClose, evidenceId }) => {
    const [evidence, setEvidence] = useState({});
    // 추후에 데이터 연결되면 바꿀 예정

    useEffect(() => {
        getEvidenceDetail(evidenceId, setEvidence);
    }, []);

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
                        {evidence.evidenceTitle}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box
                            textAlign="right"
                            mb={10}
                            borderBottom="2px"
                            borderColor="#ffd100"
                        >
                            <Text fontSize="xl" fontWeight="bold">
                                제보자: {evidence.userName}
                            </Text>

                            {evidence && (
                                <Text>
                                    사진 촬영 날짜: {evidence.imageDate}
                                </Text>
                            )}
                        </Box>
                        <Box w={"100%"}>
                            <Flex
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                {evidence && (
                                    <img
                                        src={
                                            `https://i10e105.p.ssafy.io` +
                                            evidence.imagePath
                                        }
                                        alt={evidence.evidenceTitle}
                                    />
                                )}{" "}
                            </Flex>
                        </Box>
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
