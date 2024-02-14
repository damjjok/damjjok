import React from "react";
import { Wrapper } from "./EvidenceFrame.style";
import { showingEvidenceState } from "contexts/TruthRoom";
import { useRecoilValue } from "recoil";

function EvidenceFrame() {
    const evidence = useRecoilValue(showingEvidenceState);

    return (
        <Wrapper>
            <img
                src={`https://i10e105.p.ssafy.io` + evidence.imagePath}
                alt="사진이 없어용"
            />
        </Wrapper>
    );
}

export default EvidenceFrame;
