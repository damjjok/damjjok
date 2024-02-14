import React from "react";
import { Wrapper } from "../Frame.style";
import { Box, Image, Text } from "@chakra-ui/react";

function EvidenceFrame({ evidence, onClick }) {
    return (
        <Box onClick={onClick} cursor={"pointer"}>
            <Box
                color={"dam.white"}
                display={"inline-block"}
                borderBottom={"3px solid"}
                borderColor={"dam.yellow"}
                marginY={2}
            >
                {evidence.evidenceTitle}
            </Box>
            <Box borderBottomColor={"dam.gray"} paddingBottom={2}>
                <Image
                    src={`https://i10e105.p.ssafy.io` + evidence.imagePath}
                    alt="에러"
                    w={"10rem"}
                    h={"6rem"}
                    padding={2}
                ></Image>
            </Box>
        </Box>
    );
}

export default EvidenceFrame;
