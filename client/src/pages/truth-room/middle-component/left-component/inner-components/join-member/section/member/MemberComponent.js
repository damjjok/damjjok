import React from "react";
import { Wrapper } from "./MemberComponene.style";
import phDIcon from "assets/images/phDIcon.png";
import damJJokIcon from "assets/images/damJJokIcon.png";
import { Flex, Text } from "@chakra-ui/react";

// Section component 하위에서 쓰일 멤버 이름 컴포넌트
function MemberComponent({ m, type }) {
    return (
        <Wrapper>
            <Flex marginLeft={"1rem"} color={"dam.yellow"}>
                <img
                    src={type === "담쪽이" ? damJJokIcon : phDIcon}
                    alt="icon"
                    className="w-[25px] mr-2"
                />
                <Text fontWeight={700}>{m.name}</Text>
            </Flex>
        </Wrapper>
    );
}

export default MemberComponent;
