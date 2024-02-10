import React from "react";
import SmallFrameComponent from "../../../../../small-frame/SmallFrameComponent";
import { Text } from "@chakra-ui/react";

function WaitingComponent({ text }) {
    return (
        <SmallFrameComponent
            width={700}
            height={340}
            content={
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Text as="b" fontSize={"30px"}>
                        {text}
                    </Text>
                </div>
            }
        />
    );
}

export default WaitingComponent;
