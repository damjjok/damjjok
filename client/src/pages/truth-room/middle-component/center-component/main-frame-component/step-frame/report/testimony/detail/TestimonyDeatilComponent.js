import React from "react";
import { Wrapper } from "./TestimonyDetail.style";

function TestimonyDeatilComponent({ testimony }) {
    return (
        <Wrapper>
            <div className="title-component">제목: {testimony.title}</div>
            <div className="content-component">
                <div>내용</div>
                {testimony.content}
            </div>
        </Wrapper>
    );
}

export default TestimonyDeatilComponent;
