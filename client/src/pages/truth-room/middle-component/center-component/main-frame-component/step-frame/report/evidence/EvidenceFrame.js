import React from "react";
import { Wrapper } from "./EvidenceFrame.style";
import { showingEvidenceState } from "contexts/TruthRoom";
import { useRecoilValue } from "recoil";
import { Box } from "@chakra-ui/react";

function EvidenceFrame() {
    const evidence = useRecoilValue(showingEvidenceState);

    return (
        <Wrapper>
            {!evidence ? (
                <Box>증거를 골라주세요.</Box>
            ) : (
                <img
                    src={`https://i10e105.p.ssafy.io` + evidence.imagePath}
                    style={{ width: "100%", height: "100%" }}
                    alt="사진이 없어용"
                />
            )}
        </Wrapper>
    );
}

export default EvidenceFrame;
