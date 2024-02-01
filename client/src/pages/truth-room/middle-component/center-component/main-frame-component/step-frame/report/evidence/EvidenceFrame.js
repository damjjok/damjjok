import React from "react";
import { Wrapper } from "./EvidenceFrame.style";
import { evidenceIndexState, evidenceState } from "contexts/TruthRoom";
import { useRecoilValue } from "recoil";

function EvidenceFrame(props) {
    const evidences = useRecoilValue(evidenceState);
    const evidenceIdx = useRecoilValue(evidenceIndexState);

    return (
        <Wrapper>
            <img src={evidences[evidenceIdx].img} alt="test" />
        </Wrapper>
    );
}

export default EvidenceFrame;
