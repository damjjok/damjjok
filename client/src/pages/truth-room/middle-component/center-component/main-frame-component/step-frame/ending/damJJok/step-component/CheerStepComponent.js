import { Button, Text } from "@chakra-ui/react";
import React from "react";

function CheerStepComponent({ damJJok, onClick }) {
    return (
        <div>
            <div style={{ margin: "100px", textAlign: "center" }}>
                <Text as="b" fontSize={40}>
                    이번에는 실패했지만 <p />
                    우리는 {damJJok.name}님의 금연을 응원해요!
                </Text>
            </div>
            <div style={{ margin: "20px", textAlign: "center" }}>
                <Button colorScheme={"facebook"} size={"lg"} onClick={onClick}>
                    잔여 적립금 보기
                </Button>
            </div>
        </div>
    );
}

export default CheerStepComponent;
