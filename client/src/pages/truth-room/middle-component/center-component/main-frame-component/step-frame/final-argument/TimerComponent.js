import { challengeIdState } from "contexts/TruthRoomSocket";
import { WebSocketContext } from "contexts/WebSocketContext";
import React, { useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

function TimerComponent(props) {
    // 초 단위로 총 시간을 관리
    const { finishFinalArgument } = useContext(WebSocketContext);
    const challengeId = useRecoilValue(challengeIdState);

    const [totalSeconds, setTotalSeconds] = useState(60);

    useEffect(() => {
        // 초가 0이 아닐 때만 카운트다운을 진행
        const id =
            totalSeconds > 0 &&
            setInterval(() => {
                setTotalSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        if (totalSeconds === 0) {
            clearInterval(id);
            // finishFinalArgument(challengeId);
        }
        // 컴포넌트가 언마운트되거나 카운트다운이 0에 도달하면 인터벌을 정리
        return () => clearInterval(id);
    }, [totalSeconds]);

    // 분과 초를 계산
    const minute = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // 분과 초를 항상 두 자리 숫자로 표시
    const formattedMinute = minute.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return (
        <div>
            <span>
                {formattedMinute}:{formattedSeconds}
            </span>
        </div>
    );
}

export default TimerComponent;
