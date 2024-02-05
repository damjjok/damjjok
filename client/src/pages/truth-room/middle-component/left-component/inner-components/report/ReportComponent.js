import React from "react";
import { Wrapper } from "../InnerComponent.style";
import ReportTab from "./tab/ReportTab";
import { Box, Flex, Text } from "@chakra-ui/react";
import { CalendarIcon, ChatIcon } from "@chakra-ui/icons";

function ReportComopnent(props) {
    return (
        <Wrapper>
            <Flex
                justifyContent={"center"}
                alignItems={"center"}
                marginTop={"1rem"}
            >
                <Flex
                    borderRadius={"50%"}
                    backgroundColor={"dam.yellow"}
                    width={"2rem"}
                    height={"2rem"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <CalendarIcon></CalendarIcon>
                </Flex>
                <Text
                    color={"dam.yellow"}
                    marginX={"0.5rem"}
                    fontWeight={700}
                    fontSize={"24px"}
                >
                    제보
                </Text>
            </Flex>

            <ReportTab></ReportTab>
        </Wrapper>
    );
}

export default ReportComopnent;
