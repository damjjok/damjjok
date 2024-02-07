import { atom } from "recoil";
// 진실의 방에서 소켓으로 관리할 전역 상태들

export const joinMemberListState = atom({
    // 진실의 방 입장 유저 목록
    key: "joinMemberList",
    default: [],
});

export const readyMemberCountState = atom({
    // 준비 단계에서 준비를 누른 멤버의 수
    key: "readyMemberCount",
    default: 0,
});

export const allUserReadyState = atom({
    // 모든 유저가 준비 완료 됐는지 여부
    key: "allUserReady",
    default: false,
});
