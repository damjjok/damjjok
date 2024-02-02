import React from "react";
import { Wrapper } from "./PassFailResultComponent.style";
import { Text } from "@chakra-ui/react";
import BasicButton from "components/button/BasicButton";
import { failText, passText } from "./PassFailText";

function PassFailResultComponent({ result }) {
    // result: PASS or FAIL
    console.log(result);
    if (result === "PASS") {
        console.log("PASS 입니당");
    }
    return (
        <Wrapper>
            <Text fontSize="40px" as="b">
                투표 결과
            </Text>
            <Text
                fontSize="100px"
                as="b"
                color={result === "PASS" ? "blue.400" : "tomato"}
            >
                {result}
            </Text>
            {result === "PASS" && <Text fontSize="20px">{passText}</Text>}
            {result === "FAIL" && <Text fontSize="20px">{failText}</Text>}

            <div className="next-button-container">
                <BasicButton
                    buttonName={result === "PASS" ? "나가기" : "최후 변론으로"}
                ></BasicButton>
            </div>
        </Wrapper>
    );
}

export default PassFailResultComponent;
