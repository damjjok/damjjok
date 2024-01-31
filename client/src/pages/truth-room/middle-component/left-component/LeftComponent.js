import React from "react";
import { Wrapper } from "./LeftComponent.style";
import { useRecoilValue } from "recoil";
import { stepState } from "contexts/TruthRoom";
import JoinMemberComponent from "./inner-components/JoinMemberComponent";

function LeftComponent() {
    const step = useRecoilValue(stepState);

    return (
        <Wrapper>
            {step === 1 && <JoinMemberComponent></JoinMemberComponent>}
        </Wrapper>
    );
}

export default LeftComponent;
