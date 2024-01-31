import React from "react";
import { Wrapper } from "./SectionComponent.style";

// props로 무슨 type(담쪽이, 박사님)인지와 user 정보 받아옴
function SectionComponent({ type, users }) {
    return (
        <Wrapper>
            {type}
            {users.map((user) => (
                <div>{user.name}</div>
            ))}
        </Wrapper>
    );
}

export default SectionComponent;
