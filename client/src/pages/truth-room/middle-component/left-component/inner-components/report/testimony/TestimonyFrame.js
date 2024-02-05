import React from "react";
import { Wrapper } from "../Frame.style";
import { Box, Text } from "@chakra-ui/react";

function TestimonyFrame({ testimony, onClick }) {
    return (
        <Box onClick={onClick} _hover={""} cursor={"pointer"}>
            <Box
                color={"dam.white"}
                display={"inline-block"}
                borderBottom={"3px solid"}
                borderColor={"dam.yellow"}
                marginY={2}
            >
                {testimony.title}
            </Box>
            <Box borderBottomColor={"dam.gray"} paddingBottom={2}>
                <Text isTruncated color={"dam.yellow"}>
                    {testimony.content}
                </Text>
            </Box>
        </Box>
    );
}

export default TestimonyFrame;
