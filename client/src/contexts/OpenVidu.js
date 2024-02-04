import { atom } from "recoil";

export const sessionId = atom({
    key: "openViduSessionId",
    default: "",
});

export const tokenState = atom({
    key: "openViduToken",
    default: "",
});
