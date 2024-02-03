import React from "react";
import SmallFrameComponent from "../../../../small-frame/SmallFrameComponent";
import ConfirmButtonComponent from "../../ConfirmButtonComponent";
import TextComponent from "./TextComponent";
import InputComponent from "./InputComponent";

function FineInputComponent(props) {
    return (
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
    );
}

export default FineInputComponent;
