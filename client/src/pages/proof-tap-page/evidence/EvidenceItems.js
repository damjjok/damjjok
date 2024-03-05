import { Card, CardBody, Stack, Heading, Text, useDisclosure, Image, CardHeader, Flex, CardFooter, Box } from "@chakra-ui/react";

import EvidenceDetailModal from "../modal/EvidenceDetailModal";

const EvidenceItems = ({ title, imagePath, evidenceTitle, imageDate, userName, evidenceId, evidence, onClickHandler }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    // 나중에 바꿔야함

    return (
        <div className="EvidenceItmes">
            <Card
                direction={"row"}
                w="15rem" // 너비 설정
                h="15vh" // 높이 설정
                borderWidth="1px" // 테두리 두께 설정
                borderRadius="lg" // 테두리 둥근 처리
                overflow="hidden" // 내용이 넘칠 경우 숨김 처리
                onClick={() => {
                    onOpen();
                    onClickHandler(evidenceId);
                }}
                borderColor={"dam.lightgray"}
                display={"flex"}
            >
                <Image width={"50%"} src={`https://i10e105.p.ssafy.io` + imagePath} alt={title} objectFit="cover" />
                <Box width={"50%"}>
                    <CardHeader bg="#ffd100" width={"100%"} p={2}>
                        <Text fontSize="md" fontWeight="bold" isTruncated flex={1} textAlign={"center"}>
                            {evidenceTitle}
                        </Text>
                    </CardHeader>
                    <CardFooter p={2} width={"100%"}>
                        <Stack justifyContent={"center"} alignItems={"center"} width={"100%"}>
                            <Box bg="black" borderRadius="lg" p={1}>
                                <Text fontSize="xs" fontWeight="bold" color="#fdd100">
                                    {userName}
                                </Text>
                            </Box>
                            <Text fontSize="12px" fontWeight="bold">
                                {new Date(imageDate).toLocaleDateString()}
                            </Text>
                        </Stack>
                    </CardFooter>
                </Box>
            </Card>

            <EvidenceDetailModal isOpen={isOpen} onClose={onClose} evidence={evidence} />
        </div>
    );
};

export default EvidenceItems;
