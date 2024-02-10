import React from "react";
import { Wrapper } from "./MemberComponene.style";
import phDIcon from "assets/images/phDIcon.png";
import damJJokIcon from "assets/images/damJJokIcon.png";
import { Flex, Text } from "@chakra-ui/react";
import logo from "assets/images/logo.png";

// Section component 하위에서 쓰일 멤버 이름 컴포넌트
function MemberComponent({ m, type, isReady }) {
    return (
        <Wrapper>
            <Flex marginLeft={"1rem"} color={"dam.yellow"}>
                <img
                    src={
                        type === "담쪽이"
                            ? isReady === true
                                ? logo // 임시
                                : damJJokIcon
                            : isReady === true
                            ? logo // 임시
                            : phDIcon
                    }
                    alt="icon"
                    className="w-[25px] mr-2"
                />
                <Text fontWeight={700}>{m.userName}</Text>
            </Flex>
        </Wrapper>
    );
}

export default MemberComponent;
