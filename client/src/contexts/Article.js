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
