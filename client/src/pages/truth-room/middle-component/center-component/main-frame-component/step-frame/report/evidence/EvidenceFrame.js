import React from "react";
import { Wrapper } from "./EvidenceFrame.style";
import { showingEvidenceState } from "contexts/TruthRoom";
import { useRecoilValue } from "recoil";

function EvidenceFrame() {
    const evidence = useRecoilValue(showingEvidenceState);

    return (
        <Wrapper>
            <img
                src={evidence.imagePath}
                style={{ width: "100%", height: "100%" }}
                alt="사진이 없어용"
            />
        </Wrapper>
    );
}

export default EvidenceFrame;
