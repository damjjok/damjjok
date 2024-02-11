import { challengeIdState } from "contexts/TruthRoomSocket";
import { WebSocketContext } from "contexts/WebSocketContext";
import React, { useContext } from "react";
import { useRecoilValue } from "recoil";
import TimerComponent from "./TimerComponent";
import { Wrapper } from "./FinalArgumentFrame.style";

function FinalArgumentFrame(props) {
    const { finishFinalArgument } = useContext(WebSocketContext);

    const challengeId = useRecoilValue(challengeIdState);

    function handleClickTest() {
        // 최후 변론은 타이머가 다 되면 다음 단계로 넘어감. 이 로직 구현 전 임시로 클릭 시 다음 단계로 넘어가는 함수 매핑
        finishFinalArgument(challengeId);
    }

    return (
        <Wrapper>
            <div className="timer-container">
                <TimerComponent />
            </div>
            <div onClick={handleClickTest}>최후 변론</div>
        </Wrapper>
    );
}

export default FinalArgumentFrame;
