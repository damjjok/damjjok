import { Text } from "@chakra-ui/react";

const TitleText = (props) => {
    const { children, ...rest } = props;
    return (
        <>
            <Text fontWeight={700} borderLeft={"3px solid #FFD100"} paddingLeft={"1rem"} {...rest}>
                {children}
            </Text>
        </>
    );
};

export default TitleText;
