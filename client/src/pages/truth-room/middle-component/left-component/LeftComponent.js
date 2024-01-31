import React from "react";
import { Wrapper } from "./LeftComponent.style";
import { useRecoilValue } from "recoil";
import { stepState } from "contexts/TruthRoom";
import JoinMemberComponent from "./inner-components/JoinMemberComponent";
import ReportComopnent from "./inner-components/ReportComponent";
import CalanderComponent from "./inner-components/CalenderComponent";

function LeftComponent() {
    const step = useRecoilValue(stepState);

    return (
        <Wrapper>
            {step === 1 && <ReportComopnent />}
            {(step === 4 || step === 5) && <CalanderComponent />}
            {step !== 1 && step !== 4 && step !== 5 && <JoinMemberComponent />}
        </Wrapper>
    );
}

export default LeftComponent;
