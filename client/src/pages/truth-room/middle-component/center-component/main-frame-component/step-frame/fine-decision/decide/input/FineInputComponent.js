import React from "react";
import SmallFrameComponent from "../../../../small-frame/SmallFrameComponent";
import ConfirmButtonComponent from "../../ConfirmButtonComponent";
import TextComponent from "./components/TextComponent";
import InputComponent from "./components/InputComponent";
import { Wrapper } from "./FineInputComponent.style";

function FineInputComponent(props) {
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
                        <ConfirmButtonComponent />
                    </div>
                }
            ></SmallFrameComponent>
        </Wrapper>
    );
}

export default FineInputComponent;
