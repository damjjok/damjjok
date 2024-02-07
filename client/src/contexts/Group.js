import { atom } from "recoil";

export const currentGroupState = atom({
    key: "currentGroupState",
    deafult: {},
});

export const currentGroupMemberState = atom({
    key: "currentGroupMemberState",
    default: [],
});
