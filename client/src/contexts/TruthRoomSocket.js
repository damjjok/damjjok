import { atom } from "recoil";
// 진실의 방에서 소켓으로 관리할 전역 상태들

export const stepState = atom({
    // 대기 중, 제보 판별, 투표, PASS/FAIL, 최후 변론, 벌금 결정, 종료
    key: "step",
    default: 0,
});

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
    // 모든 유저가 준비 완료 됐는지 여부 => 이거 사실상 있을 필요 없을 듯?
    key: "allUserReady",
    default: false,
});

export const stepReadyCountState = atom({
    // 단계 별 준비된 멤버 수 카운트
    key: "stepReadyMemberCount",
    default: 0,
});

export const isVotedState = atom({
    // 투표 단계에서 투표했는지 여부
    key: "isVoted",
    default: false,
});

export const voteResultState = atom({
    // 투표 결과
    key: "voteResult",
    default: "",
});

export const fineStepState = atom({
    // 투표 단계는 입력, 벌금 투표, 벌금 결정의 3단계로 나뉘므로 따로 저장
    key: "fineStep",
    default: 0,
});

export const fineVoteListState = atom({
    // 멤버들이 입력한 벌금 리스트
    key: "fineVoteList",
    default: [],
});

export const fineDeterminedState = atom({
    // 투표로 결정된 벌금
    key: "fineDetermined",
    default: 0,
});
