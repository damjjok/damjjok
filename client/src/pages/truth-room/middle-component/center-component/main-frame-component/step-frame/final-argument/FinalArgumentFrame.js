import React from "react";
import TimerComponent from "./TimerComponent";
import { Wrapper } from "./FinalArgumentFrame.style";
import { finalArgumentDamJJokState } from "contexts/TruthRoom";
import { useRecoilValue } from "recoil";
import UserVideoComponent from "pages/truth-room/openvidu/UserVideoComponent";

function FinalArgumentFrame(props) {
    const finalArgumentDamJJok = useRecoilValue(finalArgumentDamJJokState);

    return (
        <Wrapper>
            <div className="timer-container">
                <TimerComponent />
            </div>
            <div className="damJJok-frame">
                <UserVideoComponent streamManager={finalArgumentDamJJok} />
            </div>
        </Wrapper>
    );
}

export default FinalArgumentFrame;
