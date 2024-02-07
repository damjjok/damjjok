import { Card, CardBody, Stack, Heading, Text, useDisclosure, Image, CardHeader, Flex, CardFooter, Box } from "@chakra-ui/react";

import EvidenceDetailModal from "../evidence-modal/EvidenceDetailModal";

const EvidenceItems = ({ title, imagePath, evidenceTitle, imageDate, userName, evidenceId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    // 나중에 바꿔야함

    return (
        <div className="EvidenceItmes">
            <Card
                direction={{ base: "column", sm: "row" }}
                w="15vw" // 너비 설정
                h="15vh" // 높이 설정
                borderWidth="1px" // 테두리 두께 설정
                borderRadius="lg" // 테두리 둥근 처리
                overflow="hidden" // 내용이 넘칠 경우 숨김 처리
                onClick={onOpen}
                borderColor={"dam.lightgray"}
                display={"flex"}
            >
                <Image width={"7.5vw"} src={`https://i10e105.p.ssafy.io` + imagePath} alt={title} objectFit="cover" />
                <Stack justifyContent={"center"} alignItems={"center"} flex={1}>
                    <CardHeader w={"7.5vw"} bg="#ffd100" display="flex" justifyContent="space-between" alignItems="center" width={"100%"}>
                        <Text fontSize="md" fontWeight="bold" isTruncated flex={1} textAlign={"center"} w={"3vw"}>
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
                </Stack>
            </Card>

            <EvidenceDetailModal isOpen={isOpen} onClose={onClose} evidenceId={evidenceId} />
        </div>
    );
};

export default EvidenceItems;
