import React from "react";
import { Wrapper } from "../InnerComponent.style";
import StreakComponent from "./StreakComponent";
import { CheckIcon } from "@chakra-ui/icons";
import { CheckboxIcon, Flex, Text } from "@chakra-ui/react";
import AttendanceStrick from "./AttendanceStrick";

function AttendanceComponent(props) {
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
                    <CheckIcon></CheckIcon>
                </Flex>
                <Text
                    color={"dam.yellow"}
                    marginX={"0.5rem"}
                    fontWeight={700}
                    fontSize={"24px"}
                >
                    출석 현황
                </Text>
            </Flex>
            <AttendanceStrick startedDate={new Date()} />
        </Wrapper>
    );
}

export default AttendanceComponent;
