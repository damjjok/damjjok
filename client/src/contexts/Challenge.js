//Challenge.js

import { atom, selector } from "recoil";

export const challengeState = atom({
    key: "challengeState", // unique ID (with respect to other atoms/selectors)
    default: {
        // default value (aka initial value)
        userId: 0,
        userName: "",
        challengeId: 0,
        groupId: 0,
        duration: 30,
        initialMoney: "",
        savedPeriod: "",
        savedMoney: "",
        createdAt: "",
        status: "",
        determination: "오늘 하루도,,, 홧팅 ^^@@",
        profilePath: "",
    },
});

export const challengeListState = atom({
    key: "challengeListState",
    default: [],
});

export const createChallengeEndDate = selector({
    key: "challengeEndDate",
    get: ({ get }) => {
        const challenge = get(createChallengeState);
        let today = new Date();
        return new Date(today.setDate(today.getDate() + challenge.duration));
    },
});

export const challengeCandyCount = atom({
    key: "challengeCandyCount",
    default: 0,
});

export const createChallengeState = atom({
    key: "createChallengeState",
    default: {
        duration: 0,
        initialMoney: 0,
        savedMoney: 0,
        savedPeriod: 0,
    },
});
