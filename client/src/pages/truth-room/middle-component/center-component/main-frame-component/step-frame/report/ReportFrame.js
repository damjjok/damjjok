import { reportModeState } from "contexts/TruthRoom";
import React from "react";
import { useRecoilValue } from "recoil";
import TestimonyFrame from "./testimony/TestimonyFrame";

function ReportFrame(props) {
    const reportMode = useRecoilValue(reportModeState);

    return (
        <div>
            {reportMode === "EVIDENCE" && <div>목격 사진</div>}
            {reportMode === "TESTIMONY" && <TestimonyFrame />}
        </div>
    );
}

export default ReportFrame;
