import { Box, Text } from "@chakra-ui/react";

const TitleText = (props) => {
    const { children, description, ...rest } = props;
    return (
        <>
            <Box borderLeft={"5px solid #FFD100"} paddingLeft={"1rem"} fontWeight={700}>
                <Text {...rest}>{children}</Text>
                <Text color={"#c0c0c0"}>{description}</Text>
            </Box>
        </>
    );
};

export default TitleText;
