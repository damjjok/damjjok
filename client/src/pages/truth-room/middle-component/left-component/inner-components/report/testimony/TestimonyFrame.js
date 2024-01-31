import React from "react";
import { Wrapper } from "./TestimonyFrame.style";

function TestimonyFrame({ testimony }) {
    return (
        <Wrapper>
            <div>{testimony.title}</div>
            <div>{testimony.content}</div>
        </Wrapper>
    );
}

export default TestimonyFrame;
