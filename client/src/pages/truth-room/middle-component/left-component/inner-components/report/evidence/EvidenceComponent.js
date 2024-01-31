import React from "react";
import { Wrapper } from "../TabComponent.style";
import { useRecoilValue } from "recoil";
import { evidenceState } from "contexts/TruthRoom";
import EvidenceFrame from "./EvidenceFrame";

function EvidenceComponent(props) {
    const evidences = useRecoilValue(evidenceState);

    return (
        <Wrapper>
            {evidences.map((evidence) => (
                <EvidenceFrame evidence={evidence}></EvidenceFrame>
            ))}
        </Wrapper>
    );
}

export default EvidenceComponent;
