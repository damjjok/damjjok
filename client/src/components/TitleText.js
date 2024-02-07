import { Box, Text, useBreakpointValue } from "@chakra-ui/react";

const TitleText = (props) => {
    const { children, description, img, ...rest } = props;
    const isMobile = useBreakpointValue({ base: true, md: false });
    return (
        <>
            <Box
                width={"80vw"}
                // height={"100px"}
                borderRadius={"xl"}
                bgImage={`linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${img})`}
                bgPosition="left"
                bgRepeat="no-repeat"
                bgSize="cover"
                paddingX={ isMobile ? 4 : 8}
                paddingY={8}
                backdropContrast={"30%"}
            >
                <Box
                    borderLeft={"5px solid #FFD100"}
                    paddingLeft={"1rem"}
                    fontWeight={700}
                >
                    <Text {...rest}>{children}</Text>
                    <Text
                    fontSize={isMobile ? "xs" : "md"}
                    // color={"#c0c0c0"}
                    >
                        {description}
                    </Text>
                </Box>
            </Box>
        </>
    );
};

export default TitleText;
