// User.js
import { atom } from "recoil";

export const currentUserState = atom({
    key: "currentUserState",
    default: {
        email: "",
        exp: 0,
        iat: 0,
        userId: -1,
        userName: "",
    },
});

//
// export const currentGroupState = atom({
//     key: "currentGroupState",
//     default: { groupId: "1", groupName: "E105" },
// });

// accessToken 에서 받아온 유저 정보
export const currentUser = atom({
    key: "currentUser",
    default: {},
});
