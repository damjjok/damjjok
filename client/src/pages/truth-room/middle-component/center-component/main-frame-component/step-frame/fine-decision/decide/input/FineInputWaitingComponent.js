import React from "react";
import SmallFrameComponent from "../../../../small-frame/SmallFrameComponent";
import { Text } from "@chakra-ui/react";

function FineInputWaitingComponent(props) {
    return (
        <SmallFrameComponent
            width={700}
            height={340}
            content={
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Text as="b" fontSize={"30px"}>
                        다른 분들이 벌금을 입력하는 중이예요...
                    </Text>
                </div>
            }
        />
    );
}

export default FineInputWaitingComponent;
