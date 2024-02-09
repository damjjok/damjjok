const { axiosInstance } = require("util/axios/AxiosInstance");

const createChallenge = async ({
    groupId,
    duration,
    initialMoney,
    savedMoney,
    savedPeriod,
}) => {
    const body = {
        groupId: groupId,
        duration: duration,
        initialMoney: initialMoney,
        savedMoney: savedMoney,
        savedPeriod: savedPeriod,
    };
    try {
        const response = await axiosInstance.post("/v1/challenge/create", body);
        if (response.status === 200) return response.data;
        // console.log(response.status);
    } catch (error) {}
};

const getChallengeRanking = async (challengeId) => {
    try {
        const response = await axiosInstance.get(
            `/v1/challenge/${challengeId}/ranking`
        );
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {}
};
const getChallengeList = async (groupId) => {
    try {
        const response = await axiosInstance.get(
            `/v1/challenge/list/${groupId}`
        );
        if (response.status === 200) return response.data;
        else console.log("통신 실패" + response.status);
    } catch (error) {
        console.log("챌린지 정보 불러오기 실패" + error);
    }
};

const getChallengeInfo = async (challengeId) => {
    try {
        const response = await axiosInstance.get(
            `/v1/challenge/${challengeId}/detail`
        );
        if (response.status === 200) return response.data;
        else console.log("통신 실패" + response.status);
    } catch (error) {
        console.log("챌린지 정보 불러오기 실패" + error);
    }
};
const getChallengeMembers = async (challengeId, setGroupMembers) => {
    try {
        const response = await axiosInstance.get(
            `v1/challenge/${challengeId}/member-list`
        );
        const data = await response.data;
        if (response.status === 200) {
            console.log(data.list);
            setGroupMembers(data.list);
        }
    } catch (error) {
        console.log(error);
    }

    return null;
};

export {
    createChallenge,
    getChallengeRanking,
    getChallengeInfo,
    getChallengeList,
    getChallengeMembers,
};
