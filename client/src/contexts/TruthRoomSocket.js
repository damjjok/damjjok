import { atom } from "recoil";
// 진실의 방에서 소켓으로 관리할 전역 상태들

export const challengeIdState = atom({
    // 소켓 통신에 쓰일 챌린지의 ID를 관리
    key: "challengeId",
    default: "",
});

export const initGroupPhDCountState = atom({
    // 벌금 분배 화면에서 나누기 처리에 사용할 그룹의 박사님 수, 임시 값으로 시작 시점의 박사님 카운트를 넣을 것임 => WebSocketContext.js의 readyStatus 파트에 작성해둠.
    key: "initGroupPhDCount",
    default: 0,
});

export const enteringTruthRoomMemberInfoState = atom({
    // 진실의 방에 입장하는 유저의 정보(이름, 역할)
    key: "enteringTruthRommMemberInfo",
    default: {},
});

export const stepState = atom({
    // 대기 중, 제보 판별, 투표, PASS/FAIL, 최후 변론, 벌금 결정, 종료
    key: "step",
    default: 4,
});

export const joinMemberListState = atom({
    // 진실의 방 입장 유저 목록
    key: "joinMemberList",
    default: [],
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
    // 벌금 결정 단계는 벌금 결정, 완료 두 단계로 나뉨
    key: "fineStep",
    default: 0,
});

export const fineInputStepState = atom({
    // 투표 단계는 입력, 벌금 투표, 벌금 결정의 3단계로 나뉘므로 따로 저장
    key: "fineInputStep",
    default: 0,
});

export const inputFineState = atom({
    // 멤버가 입력한 벌금
    key: "inputFine",
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
