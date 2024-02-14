import { Box, Image } from "@chakra-ui/react";
import throwingCandy2 from "assets/images/throwing-candy-2.png";
import throwingCandy1 from "assets/images/throwing-candy-1.png";
import throwingCandy3 from "assets/images/throwing-candy-3.png";
import { useState } from "react";

const ThrowingCandy = ({ candies }) => {
    return (
        <>
            <Box position={"absolute"} width={"100vw"} height={"100vh"} top={0} left={0} zIndex={-1} overflow={"hidden"}>
                {candies.map((candy, index) => (
                    <Box key={index} className="throwing-candy" position={"absolute"} width={"5vw"} height={"10vh"} left={`${candy.left}vw`}>
                        <Image src={candy.type}></Image>
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default ThrowingCandy;
