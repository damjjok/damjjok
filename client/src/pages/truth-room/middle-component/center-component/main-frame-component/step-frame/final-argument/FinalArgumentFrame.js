import { challengeIdState } from "contexts/TruthRoomSocket";
import { WebSocketContext } from "contexts/WebSocketContext";
import React, { useContext } from "react";
import { useRecoilValue } from "recoil";
import TimerComponent from "./TimerComponent";
import { Wrapper } from "./FinalArgumentFrame.style";

function FinalArgumentFrame(props) {
    return (
        <Wrapper>
            <div className="timer-container">
                <TimerComponent />
            </div>
            <div className="damJJok-frame">최후 변론</div>
        </Wrapper>
    );
}

export default FinalArgumentFrame;
