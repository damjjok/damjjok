import { Text } from "@chakra-ui/react";
import React from "react";
import SmallFrameComponent from "../../../../small-frame/SmallFrameComponent";
import ConfirmButtonComponent from "../../ConfirmButtonComponent";

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
                    <ConfirmButtonComponent />
                </div>
            }
        ></SmallFrameComponent>
    );
}

export default FineInputComponent;
