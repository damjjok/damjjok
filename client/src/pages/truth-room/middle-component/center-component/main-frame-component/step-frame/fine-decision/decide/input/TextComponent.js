import { Text } from "@chakra-ui/react";
import React from "react";

function TextComponent(props) {
    return (
        <div>
            <div style={{ margin: "30px" }}>
                <Text as="b" fontSize={"35px"}>
                    벌금 제시
                </Text>
            </div>
            <div style={{ marginBottom: "40px" }}>
                <Text as="b" fontSize={"20px"}>
                    어느 정도의 벌금이 적당할까요?
                </Text>
            </div>
        </div>
    );
}

export default TextComponent;
