import React, { useState } from "react";
import PassFailResult from "./result/PassFailResult";
import { Wrapper } from "./PassFailFrame.style";

function PassFailFrame(props) {
    const result = useState("PASS"); // 일단 여기서만 쓰일 결과이며, 소켓으로 받아올 거기 때문에 전역 변수화 안함

    return (
        <Wrapper>
            <PassFailResult result={result}></PassFailResult>
        </Wrapper>
    );
}

export default PassFailFrame;
