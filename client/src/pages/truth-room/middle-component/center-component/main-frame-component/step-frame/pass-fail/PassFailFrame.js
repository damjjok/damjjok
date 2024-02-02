import React, { useState } from "react";
import PassFailResultComponent from "./result/PassFailResultComponent";
import SmallFrameComponent from "../../small-frame/SmallFrameComponent";
import BasicButton from "components/button/BasicButton";

function PassFailFrame(props) {
    const [result] = useState("PASS"); // 일단 여기서만 쓰일 결과이며, 소켓으로 받아올 거기 때문에 전역 변수화 안함

    return (
        <SmallFrameComponent
            width={752}
            height={318}
            content={<PassFailResultComponent result={result} />}
        ></SmallFrameComponent>
    );
}

export default PassFailFrame;
