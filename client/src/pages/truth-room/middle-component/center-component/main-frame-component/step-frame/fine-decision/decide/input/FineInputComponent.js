import React, { useContext } from "react";
import SmallFrameComponent from "../../../../small-frame/SmallFrameComponent";
import ConfirmButtonComponent from "../../ConfirmButtonComponent";
import TextComponent from "./components/TextComponent";
import InputComponent from "./components/InputComponent";
import { Wrapper } from "./FineComponent.style";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    challengeIdState,
    fineInputStepState,
    inputFineState,
} from "contexts/TruthRoomSocket";
import { WebSocketContext } from "contexts/WebSocketContext";

function FineInputComponent(props) {
    const { submitFine } = useContext(WebSocketContext);
    const setFineInputStep = useSetRecoilState(fineInputStepState);
    const challengeId = useRecoilValue(challengeIdState);
    const inputFine = useRecoilValue(inputFineState);

    function handleClickConfirm() {
        submitFine(challengeId, inputFine);
        setFineInputStep(1); // 각자 화면에서 벌금 입력 대기 화면으로 넘어가게 해야 하므로 소켓이 아닌 컴포넌트 내부에서 컨트롤
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
                            onClick={() => handleClickConfirm()}
                        />
                    </div>
                }
            ></SmallFrameComponent>
        </Wrapper>
    );
}

export default FineInputComponent;
