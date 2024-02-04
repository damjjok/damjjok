import {
    Card,
    CardBody,
    Stack,
    Heading,
    Text,
    useDisclosure,
    Image,
    CardHeader,
    Flex,
    CardFooter,
    Box,
} from "@chakra-ui/react";

import EvidenceDetailModal from "../evidence-modal/EvidenceDetailModal";

const EvidenceItems = ({ title, img }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    // 나중에 바꿔야함
    const person = "문지호";

    return (
        <div className="EvidenceItmes">
            <Card
                w="300px" // 너비 설정
                h="300px" // 높이 설정
                borderWidth="1px" // 테두리 두께 설정
                borderRadius="lg" // 테두리 둥근 처리
                overflow="hidden" // 내용이 넘칠 경우 숨김 처리
                onClick={onOpen}
            >
                <CardHeader
                    isTruncated
                    bg="#ffd100"
                    p={2}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    minH="50px"
                >
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
                    <Image
                        src={img}
                        alt={title}
                        borderRadius="lg"
                        objectFit="cover"
                        w="300px"
                        h="200px"
                    />
                </CardBody>
            </Card>

            <EvidenceDetailModal
                isOpen={isOpen}
                onClose={onClose}
                title={title}
                img={img}
            />
        </div>
    );
};

export default EvidenceItems;
