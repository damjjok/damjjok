import React from "react";
import { Wrapper } from "./MemberComponene.style";
import phDIcon from "assets/images/phDIcon.png";
import damJJokIcon from "assets/images/damJJokIcon.png";
import phDReadyIcon from "assets/images/phDReadyIcon.png";
import damJJokReadyIcon from "assets/images/damJJokReadyIcon.png";
import { Flex, Text } from "@chakra-ui/react";

// Section component 하위에서 쓰일 멤버 이름 컴포넌트
function MemberComponent({ m, type, isReady }) {
    return (
        <Wrapper>
            <Flex marginLeft={"1rem"} color={"dam.yellow"}>
                <img
                    src={
                        type === "담쪽이"
                            ? // 담쪽이 섹션
                              isReady === true
                                ? damJJokReadyIcon // 임시
                                : damJJokIcon
                            : // 박사님 섹션
                            isReady === true
                            ? phDReadyIcon // 임시
                            : phDIcon
                    }
                    alt="icon"
                    className="w-[25px] mr-2"
                />
                <Text fontWeight={700}>{m.name}</Text>
            </Flex>
        </Wrapper>
    );
}

export default MemberComponent;
