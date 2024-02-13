import { Card, CardBody, Stack, Text, useDisclosure, CardHeader, Box } from "@chakra-ui/react";
import TestimonyDetailModal from "../modal/TestimonyDetailModal";

const TestimonyItems = ({ testimonyTitle, testimonyContent, userName, testimonyId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    // 나중에 바꿔야함
    return (
        <div className="TestimonyItems">
            <Card
                width={"15rem"}
                height={"15vh"}
                borderWidth="1px" // 테두리 두께 설정
                borderRadius="lg" // 테두리 둥근 처리
                borderColor={"dam.lightgray"}
                overflow="hidden" // 내용이 넘칠 경우 숨김 처리
                onClick={onOpen}
            >
                <CardHeader isTruncated bg="#ffd100" display="flex" justifyContent="space-between" alignItems="center">
                    <Text fontSize="lg" fontWeight="bold" isTruncated>
                        {testimonyTitle}
                    </Text>
                    <Box bg="black" borderRadius="lg" p={1}>
                        <Text fontSize="xs" fontWeight="bold" color="#fdd100">
                            {userName}
                        </Text>
                    </Box>
                </CardHeader>
                <CardBody>
                    <Stack mt="" spacing="3">
                        <Text isTruncated>{testimonyContent}</Text>
                        {/* 내용이 넘치면 말줄임표로 처리 */}
                    </Stack>
                </CardBody>
            </Card>

            <TestimonyDetailModal isOpen={isOpen} onClose={onClose} title={testimonyTitle} content={testimonyContent} testimonyId={testimonyId} />
        </div>
    );
};
export default TestimonyItems;
