import React from "react";
import { Wrapper } from "./LeftComponent.style";
import { useRecoilValue } from "recoil";
import { stepState } from "contexts/TruthRoomSocket";
import JoinMemberComponent from "./inner-components/join-member/JoinMemberComponent";
import ReportComopnent from "./inner-components/report/ReportComponent";
import AttendanceComponent from "./inner-components/attendance/AttendanceComponent";

function LeftComponent() {
    const step = useRecoilValue(stepState);

    return (
        <Wrapper>
            {step === 1 && <ReportComopnent />}
            {(step === 4 || step === 5) && <AttendanceComponent />}
            {step !== 1 && step !== 4 && step !== 5 && <JoinMemberComponent />}
        </Wrapper>
    );
}

export default LeftComponent;
