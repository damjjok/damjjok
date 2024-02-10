import React from "react";
import PassFailResultComponent from "./result/PassFailResultComponent";
import SmallFrameComponent from "../../small-frame/SmallFrameComponent";
import { useRecoilState } from "recoil";
import { voteResultState } from "contexts/TruthRoomSocket";

function PassFailFrame(props) {
    return (
        <SmallFrameComponent
            width={752}
            height={318}
            content={<PassFailResultComponent />}
        ></SmallFrameComponent>
    );
}

export default PassFailFrame;
