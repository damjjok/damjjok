import React from "react";
import { Wrapper } from "./MainFrameComponent.style";
import { useRecoilValue } from "recoil";
import { stepState } from "contexts/TruthRoom";
import ReadyStateFrame from "./step-frame/ReadyStateFrame";
import ReportFrame from "./step-frame/report/ReportFrame";
import VoteFrame from "./step-frame/vote/VoteFrame";
import PassFailFrame from "./step-frame/PassFailFrame";
import ClosingArgumentFrame from "./step-frame/ClosingArgumentFrame";
import FineDecisionFrame from "./step-frame/FineDecisionFrame";
import EndingFrame from "./step-frame/EndingFrame";

// step-frame 디렉터리는 단계별 화면에 쓰이는 컴포넌트를 담은 디렉터리
function MainFrameComponent() {
    const step = useRecoilValue(stepState);

    return (
        <Wrapper>
            {step === 0 && <ReadyStateFrame />}
            {step === 1 && <ReportFrame />}
            {step === 2 && <VoteFrame />}
            {step === 3 && <PassFailFrame />}
            {step === 4 && <ClosingArgumentFrame />}
            {step === 5 && <FineDecisionFrame />}
            {step === 6 && <EndingFrame />}
        </Wrapper>
    );
}

export default MainFrameComponent;
