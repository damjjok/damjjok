import React from "react";
import { Wrapper } from "../TabComponent.style";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { evidenceIndexState, evidenceState } from "contexts/TruthRoom";
import EvidenceFrame from "./EvidenceFrame";

function EvidenceComponent(props) {
    const evidences = useRecoilValue(evidenceState);
    const setEvidenceIdx = useSetRecoilState(evidenceIndexState);

    function handlerEvidenceClick(index) {
        setEvidenceIdx(index);
        console.log("인덱스 변경: " + index);
    }

    return (
        <Wrapper>
            {evidences.map((evidence, index) => (
                <EvidenceFrame
                    key={index}
                    evidence={evidence}
                    onClick={() => handlerEvidenceClick(index)}
                ></EvidenceFrame>
            ))}
        </Wrapper>
    );
}

export default EvidenceComponent;
