import { Box, Image } from "@chakra-ui/react";
import throwingCandy from "assets/images/throwing-candy.png";
import { useState } from "react";
const ThrowingCandy = ({ candies }) => {
    return (
        <>
            <Box
                position={"absolute"}
                width={"100vw"}
                height={"100vh"}
                top={0}
                left={0}
                zIndex={-1}
                overflow={"hidden"}
            >
                {candies.map((candy, index) => (
                    <Box
                        key={index}
                        className="throwing-candy"
                        position={"absolute"}
                        width={"5vw"}
                        height={"10vh"}
                        left={`${candy.left}vw`}
                    >
                        <Image src={throwingCandy}></Image>
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default ThrowingCandy;
