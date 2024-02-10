import React from "react";
import { Wrapper } from "./SectionComponent.style";
import MemberComponent from "./member/MemberComponent";
import { Text } from "@chakra-ui/react";

// props로 무슨 type(담쪽이, 박사님)인지와 user 정보 받아옴
function SectionComponent({ type, members }) {
    return (
        <Wrapper>
            <Text
                fontSize={"20px"}
                fontWeight={700}
                color={"dam.yellow"}
                marginBottom={".5rem"}
            >
                {type}
            </Text>
            {members.map((member, index) => (
                <MemberComponent
                    m={member}
                    type={type}
                    key={index}
                    isReady={member.ready}
                />
            ))}
        </Wrapper>
    );
}

export default SectionComponent;
