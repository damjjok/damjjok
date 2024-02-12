import { atom } from "recoil";

export const dontTouchSnsLoginInfo = atom({
    key: "dontTouchSnsLoginInfo",
    default: {
        email: "",
        name: "",
        accessToken: "",
        refreshToken: "",
    },
});
