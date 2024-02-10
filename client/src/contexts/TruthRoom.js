import { atom } from "recoil";

export const groupState = atom({
    // 진실의 방에 참여한 멤버 목록
    key: "group",
    default: [
        {
            name: "김영후",
            role: "damJJok",
        },
        {
            name: "김일후",
            role: "phD",
        },
        {
            name: "김이후",
            role: "phD",
        },
        {
            name: "김삼후",
            role: "phD",
        },
    ],
});

export const reportModeState = atom({
    key: "reportMode",
    default: "EVIDENCE", // EVIDENCE, TESTIMONY
});

export const fineDecisionStepState = atom({
    key: "fineDecisionStep", // 벌금 결정 단계 내의 단계 상태 저장 변수
    default: 0,
});

export const fineDecisionInputStepState = atom({
    key: "fineDecisionInputStep", // 벌금 결정 단계 내의 벌금 입력의 단계 상태 저장 변수
    default: 0,
});

export const gatheredMoneyState = atom({
    key: "gatheredMoney", // 담쪽이가 모은 금액
    default: 100000,
});

export const inputFineListState = atom({
    key: "inputFineList",
    default: [10000, 18000, 20000],
});

export const decidedFineState = atom({
    key: "decidedFine", // 결정된 벌금
    default: 18000,
});

export const showingEvidenceState = atom({
    key: "showingEvidence",
    default: {},
});

export const showingTestimonyState = atom({
    key: "showingTestimony",
    default: {},
});
