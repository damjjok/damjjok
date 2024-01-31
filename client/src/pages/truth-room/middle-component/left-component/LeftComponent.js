import React from "react";
import { Wrapper } from "./LeftComponent.style";
import { useRecoilValue } from "recoil";
import { stepState } from "contexts/TruthRoom";

function LeftComponent() {
    const step = useRecoilValue(stepState);

    return <Wrapper></Wrapper>;
}

export default LeftComponent;
