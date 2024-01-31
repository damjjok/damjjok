import React from "react";
import { Wrapper } from "../Frame.style";

function EvidenceFrame({ evidence }) {
    return (
        <Wrapper>
            <div>{evidence.title}</div>
            <div>{evidence.img}</div>
        </Wrapper>
    );
}

export default EvidenceFrame;
