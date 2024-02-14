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
    ModalContent,
    ModalHeader,
    ModalBody,
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
                <CardHeader
                    sx={{
                        fontSize: "4xl", // 글씨 크기를 2xl로 설정
                        fontWeight: "bold", // 글씨를 굵게 설정
                    }}
                    paddingBottom={0}
                >
                    {testimony.testimonyTitle ? testimony.testimonyTitle : ""}
                </CardHeader>
                <CardBody>
                    <Box
                        textAlign="right"
                        mb={2}
                        borderBottom="2px"
                        borderColor="#ffd100"
                    >
                        <Text fontSize="xl" fontWeight="bold">
                            제보자 : {testimony.userName}
                        </Text>
                        <Text>
                            작성 시각 :{" "}
                            {testimony.createdAt
                                ? new Date(
                                      testimony.createdAt
                                  ).toLocaleDateString()
                                : ""}
                        </Text>
                    </Box>
                    <Box>{testimony.testimonyContent}</Box>
                </CardBody>
            </Card>
        </Wrapper>
    );
}

export default TestimonyDeatilComponent;
