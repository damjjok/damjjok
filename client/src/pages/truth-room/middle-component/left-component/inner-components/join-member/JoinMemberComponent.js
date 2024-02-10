import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Wrapper } from "../InnerComponent.style";
import SectionComponent from "./section/SectionComponent";
import { Flex, Text } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { joinMemberListState } from "contexts/TruthRoomSocket";

function JoinMemberComponent() {
    const joinMemberList = useRecoilValue(joinMemberListState);

    const [damJJok, setDamJJok] = useState([]);
    const [phDs, setPhDs] = useState([]);

    useEffect(() => {
        // let tempDamJJok = [];
        // let tempPhDs = [];
        // for (var i = 0; i < joinMember.length; i++) {
        //     // 담쪽이와 박사님들 구분
        //     if (joinMember[i].role === "damJJok")
        //         tempDamJJok.push(joinMember[i]);
        //     else if (joinMember[i].role === "phD") tempPhDs.push(joinMember[i]);
        // }
        // setDamJJok(tempDamJJok);
        // setPhDs(tempPhDs);
        setDamJJok(joinMemberList.filter((m) => m.role === "Damjjok"));
        setPhDs(joinMemberList.filter((m) => m.role !== "Damjjok"));
    }, [joinMemberList]);

    return (
        // 지금은 임시 코드입니다.
        <Wrapper className="shadow-xl">
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
                    <ChatIcon></ChatIcon>
                </Flex>
                <Text
                    color={"dam.yellow"}
                    marginX={"0.5rem"}
                    fontWeight={700}
                    fontSize={"24px"}
                >
                    참여 인원
                </Text>
            </Flex>

            <SectionComponent
                type={"담쪽이"}
                members={damJJok}
            ></SectionComponent>
            <SectionComponent type={"박사님"} members={phDs}></SectionComponent>
        </Wrapper>
    );
}

export default JoinMemberComponent;
