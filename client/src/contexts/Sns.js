import { atom } from "recoil";

export const userState = atom({
    key: "userInfo",
    default: {
        email: "",
        name: "",
        accessToken: "",
        refreshToken: "",
    },
});
