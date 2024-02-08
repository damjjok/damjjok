import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

function EmptyChallengePage() {
    const location = useLocation();

    return (
        <Box>
            <Flex
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
                height={"90vh"}
            >
                <Text fontSize={"30px"} marginBottom={"1rem"}>
                    활성화된 챌린지가 없습니다.
                </Text>
                <Button
                    height={"30%"}
                    backgroundColor={"dam.yellow"}
                    _hover={{ backgroundColor: "#3182CE" }}
                >
                    <Link to={`../create-challenge`}>
                        <Text fontSize={"30px"} marginBottom={"1rem"}>
                            새 챌린지 만들기
                        </Text>
                        <AddIcon fontSize={"5rem"}></AddIcon>
                    </Link>
                </Button>
            </Flex>
        </Box>
    );
}

export default EmptyChallengePage;
