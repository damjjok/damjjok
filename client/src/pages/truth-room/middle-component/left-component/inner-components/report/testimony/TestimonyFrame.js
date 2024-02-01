import React from "react";
import { Wrapper } from "../Frame.style";

function TestimonyFrame({ testimony, onClick }) {
    return (
        <Wrapper onClick={onClick}>
            <div>{testimony.title}</div>
            <div>{testimony.content}</div>
        </Wrapper>
    );
}

export default TestimonyFrame;
