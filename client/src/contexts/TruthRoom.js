import { atom } from "recoil";

export const damJJokNameState = atom({
    // 종료 단계에서 담쪽이 이름을 표출하기 위해 저장
    key: "damJJokName",
    default: "",
});

export const reportModeState = atom({
    key: "reportMode",
    default: "EVIDENCE", // EVIDENCE, TESTIMONY
});

export const gatheredMoneyState = atom({
    key: "gatheredMoney", // 담쪽이가 모은 금액
    default: 100000,
});

export const showingEvidenceState = atom({
    key: "showingEvidence",
    default: {},
});

export const showingTestimonyState = atom({
    key: "showingTestimony",
    default: {},
});

export const finalArgumentDamJJokState = atom({
    key: "finalArgumentDamJJok",
    default: {},
});
