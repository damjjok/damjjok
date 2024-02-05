import { Card, CardBody, Stack, Text, useDisclosure, CardHeader, Flex, CardFooter, Box } from "@chakra-ui/react";
import TestimonyDetailModal from "../testimony-modal/TestimonyDetailModal";

const TestimonyItems = ({ title, content }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    // 나중에 바꿔야함
    const person = "문지호";
    const day = "2024-03-04 14:22";
    return (
        <div className="TestimonyItems">
            <Card
                width={"15vw"}
                height={"15vh"}
                borderWidth="1px" // 테두리 두께 설정
                borderRadius="lg" // 테두리 둥근 처리
                borderColor={"dam.lightgray"}
                overflow="hidden" // 내용이 넘칠 경우 숨김 처리
                onClick={onOpen}
            >
                <CardHeader isTruncated bg="#ffd100" display="flex" justifyContent="space-between" alignItems="center">
                    <Text fontSize="lg" fontWeight="bold" isTruncated>
                        {title}
                    </Text>
                    <Box bg="black" borderRadius="lg" p={1}>
                        <Text fontSize="xs" fontWeight="bold" color="#fdd100">
                            {person}
                        </Text>
                    </Box>
                </CardHeader>
                <CardBody>
                    <Stack mt="" spacing="3">
                        <Text isTruncated>{content}</Text>
                        {/* 내용이 넘치면 말줄임표로 처리 */}
                    </Stack>
                </CardBody>

                <CardFooter p={2}>
                    <Flex justifyContent="flex-end" width="100%">
                        <Text fontSize="12px" fontWeight="bold">
                            {day}
                        </Text>
                    </Flex>
                </CardFooter>
            </Card>

            <TestimonyDetailModal isOpen={isOpen} onClose={onClose} title={title} content={content} />
        </div>
    );
};
export default TestimonyItems;
