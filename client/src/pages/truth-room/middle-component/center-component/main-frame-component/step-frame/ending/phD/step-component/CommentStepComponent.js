import { Button, Text } from "@chakra-ui/react";
import React from "react";

function CommentStepComponent({ damJJok, onClick }) {
    return (
        <div>
            <div style={{ margin: "100px", textAlign: "center" }}>
                <Text as="b" fontSize={50}>
                    {damJJok.name}님의 이번 금연은 실패했어요
                </Text>
            </div>
            <div style={{ margin: "100px", textAlign: "center" }}>
                <Text as="b" fontSize={30}>
                    하지만 {damJJok.name}님이 다시 도전할 때<p />또 한 번 도움을
                    주세요!
                </Text>
            </div>
            <div style={{ margin: "20px", textAlign: "center" }}>
                <Button colorScheme={"facebook"} size={"lg"} onClick={onClick}>
                    분배금 보기
                </Button>
            </div>
        </div>
    );
}

export default CommentStepComponent;
