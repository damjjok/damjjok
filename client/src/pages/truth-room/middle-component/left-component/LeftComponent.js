import React from "react";
import { Wrapper } from "./LeftComponent.style";
import { useRecoilValue } from "recoil";
import { stepState } from "contexts/TruthRoom";
import JoinMemberComponent from "./inner-components/JoinMemberComponent";
import ReportComopnent from "./inner-components/ReportComponent";

function LeftComponent() {
    const step = useRecoilValue(stepState);

    return (
        <Wrapper>
            {step === 1 && <ReportComopnent />}
            {step !== 1 && step !== 4 && step !== 5 && <JoinMemberComponent />}
        </Wrapper>
    );
}

export default LeftComponent;
