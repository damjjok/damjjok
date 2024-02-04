import React from "react";
import SmallFrameComponent from "../../../small-frame/SmallFrameComponent";
import { Text } from "@chakra-ui/react";

function DecideWaitingComponent(props) {
    return (
        <SmallFrameComponent
            width={700}
            height={340}
            content={
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Text as="b" fontSize={"30px"}>
                        벌금을 결정하는 중이예요...
                    </Text>
                </div>
            }
        />
    );
}

export default DecideWaitingComponent;
