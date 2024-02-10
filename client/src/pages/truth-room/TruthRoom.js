import React, { useContext, useEffect } from "react";
import { Wrapper } from "./TruthRoom.style";
import TopComponent from "./top-component/TopComponent";
import MiddleComponent from "./middle-component/MiddleComponent";
import BottomComponent from "./bottom-component/BottomComponent";
import { useParams } from "react-router-dom";
import { enteringTruthRoomMemberInfoState } from "../../contexts/TruthRoomSocket";
import { useRecoilValue } from "recoil";
import { WebSocketContext } from "contexts/WebSocketContext";

function TruthRoom() {
    const { connect, enterRoom } = useContext(WebSocketContext); // context로 선언한 소켓 사용
    const { challengeId } = useParams(); // 구조 분해 할당
    const enteringTruthRoomMemberInfo = useRecoilValue(
        enteringTruthRoomMemberInfoState
    );
    useEffect(() => {
        // 진실의 방 렌더링 시 소켓 연결, 방 입장 처리
        connect()
            .then(() => {
                enterRoom(
                    challengeId,
                    enteringTruthRoomMemberInfo.name,
                    enteringTruthRoomMemberInfo.role
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Wrapper>
            <TopComponent></TopComponent>
            <MiddleComponent></MiddleComponent>
            <BottomComponent></BottomComponent>
        </Wrapper>
    );
}

export default TruthRoom;
