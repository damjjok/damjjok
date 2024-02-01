import React from "react";
import { Wrapper } from "./TestimonyDetail.style";

function TestimonyDeatilComponent({ testimony }) {
    return (
        <Wrapper>
            <div style={{ margin: "20px" }}>제목: {testimony.title}</div>
            <div
                style={{
                    margin: "20px",
                    height: "400px",
                    border: "1px solid black",
                }}
            >
                <div>내용</div>
                {testimony.content}
            </div>
        </Wrapper>
    );
}

export default TestimonyDeatilComponent;
