import React from "react";
import SmallFrameComponent from "../../../../../small-frame/SmallFrameComponent";
import { Text } from "@chakra-ui/react";
import { fineDecisionInputStepState } from "contexts/TruthRoom";
import { useRecoilState } from "recoil";

function FineInputWaitingComponent(props) {
    const [fineDecisionInputStep, setFineDecisionInputStep] = useRecoilState(
        fineDecisionInputStepState
    );
    function testOnClick() {
        // 테스트 시 단계 건너뛰기 용 함수
        setFineDecisionInputStep(fineDecisionInputStep + 1);
    }

    return (
        <SmallFrameComponent
            width={700}
            height={340}
            content={
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Text as="b" fontSize={"30px"} onClick={testOnClick}>
                        다른 분들이 벌금을 입력하는 중이예요...
                    </Text>
                </div>
            }
        />
    );
}

export default FineInputWaitingComponent;
