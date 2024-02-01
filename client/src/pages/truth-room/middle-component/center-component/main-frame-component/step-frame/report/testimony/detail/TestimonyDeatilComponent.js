import React from "react";
import { Wrapper } from "./TestimonyDetailComponent.style";
import {
    Box,
    Card,
    CardHeader,
    CardBody,
    Text,
    Flex,
    Heading,
} from "@chakra-ui/react";

function TestimonyDeatilComponent({ testimony }) {
    return (
        <Wrapper>
            {/* <div className="title-container">제목: {testimony.title}</div>
            <div className="writer-container">작성자: {testimony.writer}</div>
            <div className="content-container">
                <div>내용</div>
                {testimony.content}
            </div> */}
            <Card className="card-container">
                <CardHeader>
                    <Flex spacing="4">
                        <Flex
                            flex="1"
                            gap="4"
                            alignItems="center"
                            flexWrap="wrap"
                        >
                            <Box>
                                <Heading size="md">{testimony.title}</Heading>
                                <Text>{testimony.writer}</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>{testimony.content}</Text>
                </CardBody>
            </Card>
        </Wrapper>
    );
}

export default TestimonyDeatilComponent;
