import { atom } from "recoil";

export const stepState = atom({
    // 대기 중, 제보 판별, 투표, PASS/FAIL, 최후 변론, 벌금 결정, 종료
    key: "step",
    default: 4,
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
