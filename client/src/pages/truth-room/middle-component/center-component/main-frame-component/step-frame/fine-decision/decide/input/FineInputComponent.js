import React from "react";
import SmallFrameComponent from "../../../../small-frame/SmallFrameComponent";
import ConfirmButtonComponent from "../../ConfirmButtonComponent";
import TextComponent from "./components/TextComponent";
import InputComponent from "./components/InputComponent";
import { Wrapper } from "./FineComponent.style";
import { useRecoilState } from "recoil";
import { fineDecisionInputStepState } from "contexts/TruthRoom";

function FineInputComponent(props) {
    const [fineDecisionInputStep, setFineDecisionInputStep] = useRecoilState(
        fineDecisionInputStepState
    );

    function handleClickConfirm() {
        setFineDecisionInputStep(fineDecisionInputStep + 1);
    }

    return (
        <Wrapper>
            <SmallFrameComponent
                width={700}
                height={340}
                content={
                    <div
                        style={{
                            textAlign: "center",
                            justifyContent: "center",
                        }}
                    >
                        <TextComponent></TextComponent>
                        <InputComponent></InputComponent>
                        <ConfirmButtonComponent
                            margin={0}
                            onClick={handleClickConfirm}
                        />
                    </div>
                }
            ></SmallFrameComponent>
        </Wrapper>
    );
}

export default FineInputComponent;
