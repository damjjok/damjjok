import React from "react";
import { Wrapper } from "./TestimonyDetailComponent.style";

function TestimonyDeatilComponent({ testimony }) {
    return (
        <Wrapper>
            <div className="title-container">제목: {testimony.title}</div>
            <div className="writer-container">작성자: 누구누구</div>
            <div className="content-container">
                <div>내용</div>
                {testimony.content}
            </div>
        </Wrapper>
    );
}

export default TestimonyDeatilComponent;
