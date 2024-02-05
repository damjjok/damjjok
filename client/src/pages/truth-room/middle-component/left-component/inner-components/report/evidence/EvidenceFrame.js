import React from "react";
import { Wrapper } from "../Frame.style";
import { Box, Image, Text } from "@chakra-ui/react";

function EvidenceFrame({ evidence, onClick }) {
    return (
        <Wrapper onClick={onClick}>
            <Box
                color={"dam.white"}
                display={"inline-block"}
                borderBottom={"3px solid"}
                borderColor={"dam.yellow"}
            >
                {evidence.title}
            </Box>
            <div>
                <Image
                    src={evidence.img}
                    alt="에러"
                    w={"10rem"}
                    h={"6rem"}
                    padding={2}
                ></Image>
            </div>
        </Wrapper>
    );
}

export default EvidenceFrame;
