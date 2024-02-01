import { Card, CardBody, Stack, Heading, Text } from "@chakra-ui/react";

const TestimonyItems = ({ title, content }) => {
    return (
        <div className="TestimonyItems">
            <Card maxW="sm">
                <CardBody>
                    <Stack mt="6" spacing="3">
                        <Heading size="md">{title}</Heading>
                        <Text>{content}</Text>
                    </Stack>
                </CardBody>
            </Card>
        </div>
    );
};
export default TestimonyItems;
