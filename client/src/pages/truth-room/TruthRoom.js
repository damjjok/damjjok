import React, { useContext, useEffect } from "react";
import { Wrapper } from "./TruthRoom.style";
import TopComponent from "./top-component/TopComponent";
import MiddleComponent from "./middle-component/MiddleComponent";
import BottomComponent from "./bottom-component/BottomComponent";
import { useRecoilState, useRecoilValue } from "recoil";
import { WebSocketContext } from "contexts/WebSocketContext";
import {
    challengeIdState,
    enteringTruthRoomMemberInfoState,
} from "contexts/TruthRoomSocket";
import { gatheredMoneyState } from "contexts/TruthRoom";
import { getSavedMoney } from "apis/api/Challenge";

function TruthRoom() {
    const { connect, enterRoom } = useContext(WebSocketContext); // context로 선언한 소켓 사용
    const challengeId = useRecoilValue(challengeIdState);
    const enteringTruthRoomMemberInfo = useRecoilValue(
        enteringTruthRoomMemberInfoState,
    );
    const [gatheredMoney, setGatheredMoney] =
        useRecoilState(gatheredMoneyState);
    useEffect(() => {
        // 진실의 방 렌더링 시 소켓 연결, 방 입장 처리
        console.log(challengeId);
        connect()
            .then(() => {
                enterRoom(
                    challengeId,
                    enteringTruthRoomMemberInfo.name,
                    enteringTruthRoomMemberInfo.role,
                    getSavedMoney(challengeId, () => setGatheredMoney()),
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
