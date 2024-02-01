import { atom } from "recoil";
import logo from "assets/images/logo.png";

export const stepState = atom({
    // 대기 중, 제보 판별, 투표, PASS/FAIL, 최후 변론, 벌금 결정, 종료
    key: "step",
    default: 0,
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

export const evidenceState = atom({
    key: "evidence",
    default: [
        { title: "증거 1", img: logo },
        { title: "증거 2", img: logo },
        { title: "증거 3", img: logo },
    ],
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
