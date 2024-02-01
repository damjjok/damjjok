import {
    Card,
    CardBody,
    Stack,
    Heading,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import TestimonyDetailModal from "../testimony-modal/TestimonyDetailModal";

const TestimonyItems = ({ title, content }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div className="TestimonyItems">
            <Card maxW="sm" onClick={onOpen}>
                <CardBody>
                    <Stack mt="6" spacing="3">
                        <Heading size="md">{title}</Heading>
                        <Text>{content}</Text>
                    </Stack>
                </CardBody>
            </Card>

            <TestimonyDetailModal
                isOpen={isOpen}
                onClose={onClose}
                title={title}
                content={content}
            />
        </div>
    );
};
export default TestimonyItems;
