import { axiosInstance } from "util/axios/AxiosInstance";

const getChallengeCandyCount = async (challengeId) => {
    try {
        const response = await axiosInstance.get(`/v1/candy/${challengeId}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {}
};

const postChallengeCandyCount = async (challengeId, userId) => {
    try {
        const requestBody = {
            challengeId: challengeId,
            userId: userId,
        };
        const response = await axiosInstance.post("/v1/candy", requestBody);
        if (response.status === 200) {
            console.log("응원하기 성공!");
        }
    } catch (error) {}
};

const getBestMember = async (challengeId) => {
    try {
        const response = await axiosInstance.get(
            `/v1/candy/best-member/${challengeId}`
        );
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {}
};
export { getChallengeCandyCount, postChallengeCandyCount, getBestMember };
