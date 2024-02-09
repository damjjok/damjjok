import { atom } from "recoil";

export const currentGroupState = atom({
    key: "currentGroupState",
    default: {},
});

export const currentGroupMemberState = atom({
    key: "currentGroupMemberState",
    default: [],
});
