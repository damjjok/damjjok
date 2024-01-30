//Challenge.js

import { atom } from "recoil";

export const challengeState = atom({
    key: "challengeState", // unique ID (with respect to other atoms/selectors)
    default: {
        // default value (aka initial value)
        challengeId: 0,
        groupId: 0,
        duration: 30,
        initialMoney: "",
        savedPeriod: "",
        savedMoney: "",
        createdAt: new Date(),
        status: "",
        determination: "오늘 하루도,,, 홧팅 ^^@@",
        profilePath: "",
    },
});

export const challengeListState = atom({
    key: "challengeListState",
    default: [],
});
