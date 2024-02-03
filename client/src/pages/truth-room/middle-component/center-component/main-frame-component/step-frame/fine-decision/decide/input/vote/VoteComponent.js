import { Text } from "@chakra-ui/react";
import React from "react";
import ConfirmButtonComponent from "../../../ConfirmButtonComponent";

function VoteComponent(props) {
    return (
        <div style={{ textAlign: "center" }}>
            <div className="title-container">
                <Text as="b" fontSize={"35px"}>
                    벌금 결정
                </Text>
                <ConfirmButtonComponent margin={50} />
            </div>
        </div>
    );
}

export default VoteComponent;
