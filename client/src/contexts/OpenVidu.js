import { atom } from "recoil";

export const sessionKeyState = atom({
    key: "sessionKey",
    default: "0",
});

export const userNameState = atom({
    // 오픈비두 테스트에 쓰일 변수
    key: "userName",
    default: "hoo",
});
