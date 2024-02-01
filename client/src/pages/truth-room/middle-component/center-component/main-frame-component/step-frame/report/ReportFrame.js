import { reportModeState } from "contexts/TruthRoom";
import React from "react";
import { useRecoilValue } from "recoil";
import TestimonyFrame from "./testimony/TestimonyFrame";
import EvidenceFrame from "./evidence/EvidenceFrame";

function ReportFrame(props) {
    const reportMode = useRecoilValue(reportModeState);

    return (
        <div>
            {reportMode === "EVIDENCE" && <EvidenceFrame />}
            {reportMode === "TESTIMONY" && <TestimonyFrame />}
        </div>
    );
}

export default ReportFrame;
