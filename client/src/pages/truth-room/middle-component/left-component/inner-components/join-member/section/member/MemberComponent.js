import React from "react";
import { Wrapper } from "./MemberComponene.style";

// Section component 하위에서 쓰일 멤버 이름 컴포넌트
function MemberComponent({ m }) {
    return <Wrapper>{m.name}</Wrapper>;
}

export default MemberComponent;
