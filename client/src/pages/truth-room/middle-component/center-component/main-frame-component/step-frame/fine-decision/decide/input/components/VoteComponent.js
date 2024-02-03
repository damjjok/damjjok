import { Text } from "@chakra-ui/react";
import React from "react";

function VoteComponent(props) {
    return (
        <div>
            <div className="title-container">
                <Text as="b" fontSize={"35px"}>
                    벌금 결정
                </Text>
            </div>
        </div>
    );
}

export default VoteComponent;
