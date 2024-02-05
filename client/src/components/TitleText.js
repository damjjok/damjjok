import { Box, Text } from "@chakra-ui/react";

const TitleText = (props) => {
    const { children, description, img, ...rest } = props;
    return (
        <>
            <Box
                width={"70vw"}
                height={"150px"}
                borderRadius={"xl"}
                bgImage={`linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(${img})`}
                bgPosition="left"
                paddingLeft={8}
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
