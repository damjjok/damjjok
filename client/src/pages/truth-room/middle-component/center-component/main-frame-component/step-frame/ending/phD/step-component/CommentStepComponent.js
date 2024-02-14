import { Button, Text } from "@chakra-ui/react";
import { damJJokNameState } from "contexts/TruthRoom";
import React from "react";
import { useRecoilValue } from "recoil";

function CommentStepComponent({ onClick }) {
    const damJJokName = useRecoilValue(damJJokNameState);
    return (
        <div>
            <div style={{ margin: "50px", textAlign: "center" }}>
                <Text as="b" fontSize={50}>
                    {damJJokName}님의 이번 금연은 실패했어요
                </Text>
            </div>
            <div style={{ margin: "80px", textAlign: "center" }}>
                <Text as="b" fontSize={30}>
                    하지만 {damJJokName}님이 다시 도전할 때<p />또 한 번 도움을
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
