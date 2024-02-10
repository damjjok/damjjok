import React, { useContext, useState } from "react";
import BasicButton from "components/button/BasicButton";
import { useRecoilState } from "recoil";
import { stepState } from "contexts/TruthRoomSocket";
import { WebSocketContext } from "contexts/WebSocketContext";
import { useParams } from "react-router-dom";

function ReadyStateFrame() {
    const { setReady } = useContext(WebSocketContext); // context로 선언한 소켓 사용
    const [buttonClicked, setButtonClicked] = useState(false);

    const { challengeId } = useParams();

    function startButtonClick() {
        setReady(challengeId); // 소켓을 통해 준비 완료 신호 전송
        setButtonClicked(true);
    }

    if (!buttonClicked) {
        // 여기서 쓰이는 버튼들은 일단 BasicButton으로 뒀습니다.
        // 후에 css 정리를 할 때 ui에 맞는 버튼으로의 수정이 필요합니다.
        return (
            <BasicButton
                buttonName={"시작하기"}
                variant={"bigBtn"}
                onClick={startButtonClick}
            />
        );
    } else {
        return (
            <BasicButton
                buttonName={"준비 완료!"}
                variant={"cancel"}
            ></BasicButton>
        );
    }
}

export default ReadyStateFrame;
