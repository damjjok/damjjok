import { Text } from "@chakra-ui/react";
import React from "react";

function InputComponent(props) {
    return (
        <div>
            <input className="input-container" defaultValue={0}></input>
            <Text as="b" fontSize={"20px"}>
                원
            </Text>
        </div>
    );
}

export default InputComponent;
