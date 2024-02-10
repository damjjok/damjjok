import React, { useContext } from "react";
import SmallFrameComponent from "../../../../small-frame/SmallFrameComponent";
import ConfirmButtonComponent from "../../ConfirmButtonComponent";
import TextComponent from "./components/TextComponent";
import InputComponent from "./components/InputComponent";
import { Wrapper } from "./FineComponent.style";
import { useRecoilValue } from "recoil";
import { challengeIdState, inputFineState } from "contexts/TruthRoomSocket";
import { WebSocketContext } from "contexts/WebSocketContext";

function FineInputComponent(props) {
    const { submitFine } = useContext(WebSocketContext);
    const challengeId = useRecoilValue(challengeIdState);
    const inputFine = useRecoilValue(inputFineState);

    function handleClickConfirm() {
        submitFine(challengeId, inputFine);
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
