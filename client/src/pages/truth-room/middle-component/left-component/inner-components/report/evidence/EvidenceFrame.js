import React from "react";
import { Wrapper } from "../Frame.style";

function EvidenceFrame({ evidence }) {
    return (
        <Wrapper>
            <div>{evidence.title}</div>
            <div>
                <img src={evidence.img} alt="에러"></img>
            </div>
        </Wrapper>
    );
}

export default EvidenceFrame;
