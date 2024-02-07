import React from "react";
import { Wrapper } from "./PassFailResultComponent.style";
import { Text } from "@chakra-ui/react";
import BasicButton from "components/button/BasicButton";
import { failText, passText } from "./PassFailText";
import { useRecoilState } from "recoil";
import { stepState } from "contexts/TruthRoomSocket";

function PassFailResultComponent({ result }) {
    // result: PASS or FAIL
    const [step, setStep] = useRecoilState(stepState);

    function handleNextClick(mode) {
        // mode: exit(나가기) or next(최후 변론으로)
        if (mode === "exit") {
            // 원래 나가는 기능 매핑돼야하지만 일단은 임시 처리
            console.log("원래 나가는 기능 매핑돼야합니다");
            setStep(step + 1);
        } else if (mode === "next") {
            setStep(step + 1);
        }
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
                    onClick={
                        result === "PASS"
                            ? () => handleNextClick("exit")
                            : () => handleNextClick("next")
                    }
                ></BasicButton>
            </div>
        </Wrapper>
    );
}

export default PassFailResultComponent;
