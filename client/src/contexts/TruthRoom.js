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
    key: "finalArgumentDamJJok", // 최후 변론 단계의 중앙에 담쪽이 화면 띄우기 위해 저장하는 담쪽이의 openvidu stream 정보
    default: undefined,
    dangerouslyAllowMutability: true, // 이 라인 없으면 Cannot add property 0, object is not extensible 발생, 해결법 참고: https://velog.io/@taemin4u/2023-02-12
});
