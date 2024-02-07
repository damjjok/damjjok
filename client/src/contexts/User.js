// User.js
import { atom } from "recoil";

export const currentUserState = atom({
    key: "currentUserState",
    default: {
        email: "moonwlgh@naver.com",
        exp: 1722844037,
        iat: 1707292037,
        userId: 56,
        userName: "문지호"
    },
});
//
// export const currentGroupState = atom({
//     key: "currentGroupState",
//     default: { groupId: "1", groupName: "E105" },
// });
