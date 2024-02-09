import React, { useEffect, useState } from "react";
import { Wrapper } from "../TabComponent.style";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
    evidenceIndexState,
    evidenceState,
    showingEvidenceState,
} from "contexts/TruthRoom";
import EvidenceFrame from "./EvidenceFrame";
import { useParams } from "react-router-dom";
import { getEvidenceInTruthRoom } from "apis/api/Proof";

function EvidenceComponent(props) {
    // const evidences = useRecoilValue(evidenceState);
    const { challengeId } = useParams();
    const [evidences, setEvidences] = useState([]);
    const setShowingEvidence = useSetRecoilState(showingEvidenceState);

    function EvidenceClickhandler(evidence) {
        setShowingEvidence(evidence);
        console.log("Showing Evidence 설정");
    }

    useEffect(() => {
        getEvidenceInTruthRoom(challengeId, setEvidences);
    }, []);

    return (
        <Wrapper>
            {evidences.map((evidence, index) => (
                <EvidenceFrame
                    key={index}
                    evidence={evidence}
                    onClick={() => EvidenceClickhandler(evidence)}
                ></EvidenceFrame>
            ))}
        </Wrapper>
    );
}

export default EvidenceComponent;
