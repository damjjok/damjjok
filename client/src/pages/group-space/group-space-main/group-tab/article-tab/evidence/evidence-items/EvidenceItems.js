import {
    Card,
    CardBody,
    Stack,
    Heading,
    Text,
    useDisclosure,
    Image,
} from "@chakra-ui/react";

import EvidenceDetailModal from "../evidence-modal/EvidenceDetailModal";

const EvidenceItems = ({ title, content, img }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div className="EvidenceItmes">
            <Card maxW="sm" onClick={onOpen}>
                <CardBody>
                    <Image src={img} alt={title} borderRadius="lg" />
                    <Stack mt="6" spacing="3">
                        <Heading size="md">{title}</Heading>
                        <Text>{content}</Text>
                    </Stack>
                </CardBody>
            </Card>

            <EvidenceDetailModal
                isOpen={isOpen}
                onClose={onClose}
                title={title}
                content={content}
                img={img}
            />
        </div>
    );
};

export default EvidenceItems;
