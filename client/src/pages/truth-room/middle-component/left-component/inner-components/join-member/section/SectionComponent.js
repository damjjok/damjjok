import React from "react";
import { Wrapper } from "./SectionComponent.style";
import MemberComponent from "./member/MemberComponent";

// props로 무슨 type(담쪽이, 박사님)인지와 user 정보 받아옴
function SectionComponent({ type, members }) {
    return (
        <Wrapper>
            {type}
            {members.map((member) => (
                <MemberComponent m={member} />
            ))}
        </Wrapper>
    );
}

export default SectionComponent;
