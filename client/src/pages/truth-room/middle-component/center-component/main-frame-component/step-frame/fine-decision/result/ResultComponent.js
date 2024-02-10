import React from "react";
import SmallFrameComponent from "../../../small-frame/SmallFrameComponent";
import CheckImageComponent from "./CheckImageComponent";
import { Text } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import ConfirmButtonComponent from "../ConfirmButtonComponent";
import { fineDeterminedState, stepState } from "contexts/TruthRoomSocket";

function ResultComponent(props) {
    const fineDetermined = useRecoilValue(fineDeterminedState);
    const [step, setStep] = useRecoilState(stepState);

    function handleClickConfirm() {
        setStep(6);
    }

    return (
        <div>
            <SmallFrameComponent
                width={700}
                height={340}
                content={
                    <div>
                        <CheckImageComponent />
                        <div style={{ textAlign: "center" }}>
                            <div style={{ marginTop: "10px" }}>
                                <Text as="b" fontSize={"30px"}>
                                    벌금 결정 완료!
                                </Text>
                                <div style={{ marginTop: "20px" }}>
                                    <Text as="b" fontSize={"20px"}>
                                        벌금은 <p></p>
                                        {fineDetermined}원이예요
                                    </Text>
                                </div>
                            </div>
                        </div>
                        <ConfirmButtonComponent
                            onClick={() => handleClickConfirm()}
                            margin={30}
                        />
                    </div>
                }
            ></SmallFrameComponent>
        </div>
    );
}

export default ResultComponent;
