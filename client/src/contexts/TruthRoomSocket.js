import { atom } from "recoil";
// 진실의 방에서 소켓으로 관리할 전역 상태들

export const joinMemberListState = atom({
    // 진실의 방 입장 유저 목록
    key: "joinMemberList",
    default: [],
});
