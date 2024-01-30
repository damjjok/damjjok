// User.js
import { atom } from "recoil";

export const currentUserState = atom({
    key: "currentUserState",
    default: {
        userId: 1,
        groupId: [1, 2, 3],
        birth: "1994-09-16",
        sex: "남성",
        email: "kain9101@naver.com",
        userName: "손종민",
        joinDate: "2024-01-10",
    },
});

export const currentGroupState = atom({
    key: "currentGroupState",
    default: { groupId: "1", groupName: "E105" },
});
