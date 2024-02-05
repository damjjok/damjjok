import { atom } from "recoil";
import logo from "assets/images/logo.png";
import piggyBankLogo from "assets/images/piggybanklogo.png";
import testImg1 from "logo.svg";

export const stepState = atom({
    // 대기 중, 제보 판별, 투표, PASS/FAIL, 최후 변론, 벌금 결정, 종료
    key: "step",
    default: 0,
});

export const voteState = atom({
    // 투표 단계에서 투표여부 판단할 때 쓰임
    key: "vote",
    default: false,
});

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

export const evidenceIndexState = atom({
    key: "evidenceIndex",
    default: 0,
});

export const evidenceState = atom({
    key: "evidence",
    default: [
        { title: "증거 1", img: logo },
        { title: "증거 2", img: piggyBankLogo },
        { title: "증거 3", img: testImg1 },
    ],
});

export const testimonyIndexState = atom({
    key: "testimonyIndex",
    default: 0,
});

export const testimonyState = atom({
    key: "testimony",
    default: [
        {
            title: "증언 1",
            writer: "작성자1",
            content: "이새끼 담배 폈습니다1",
        },
        {
            title: "증언 2",
            writer: "작성자2",
            content: "이새끼 담배 폈습니다2",
        },
        {
            title: "증언 3",
            writer: "작성자3",
            content: "이새끼 담배 폈습니다3",
        },
        {
            title: "증언 4",
            writer: "작성자4",
            content: "이새끼 담배 폈습니다4",
        },
    ],
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
