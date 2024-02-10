import { Button, Text } from "@chakra-ui/react";
import React from "react";

function AskStepComponent({ damJJokName }) {
    return (
        <div>
            <div style={{ marginTop: "100px", textAlign: "center" }}>
                <Text as="b" fontSize={40}>
                    {damJJokName}님, <p />
                    이번 챌린지에는 실패하셨지만
                    <p />또 다시 도전할 수 있어요!
                </Text>
            </div>
            <div style={{ margin: "50px", textAlign: "center" }}>
                <Text as="b" fontSize={30}>
                    다시 도전하시겠어요?
                </Text>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "20px",
                    justifyContent: "center",
                }}
            >
                <div style={{ marginRight: "10px" }}>
                    <Button colorScheme="linkedin" size="lg">
                        예
                    </Button>
                </div>
                <div style={{ marginLeft: "10px" }}>
                    <Button colorScheme="orange" size="lg">
                        아니오
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AskStepComponent;
