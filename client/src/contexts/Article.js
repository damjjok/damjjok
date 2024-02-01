import { atom } from "recoil";

export const testimonyList = atom({
    key: "testimonyList",
    default: [],
});

export const testimonyData = atom({
    key: "testimonyData",
    default: {
        title: "",
        content: "",
    },
});

export const evidenceList = atom({
    key: "evidenceList",
    default: [],
});

export const evidenceData = atom({
    key: "evidenceData",
    default: {
        title: "",
        content: "",
        img: null,
    },
});
