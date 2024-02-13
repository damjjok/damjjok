const { axiosInstance } = require("util/axios/AxiosInstance");

const postCheerMessage = async (challengeId, content) => {
    try {
        const requestBody = {
            challengeId: challengeId,
            content: content,
        };
        const response = await axiosInstance.post("/v1/cheer-msg", requestBody);
        if (response.status === 200) {
            console.log("응원 메시지 보내기 성공!");
        }
    } catch (error) {}
};

const getCheerMessageList = async (challengeId) => {
    try {
        const response = await axiosInstance.get(
            `/v1/cheer-msg/${challengeId}`
        );
        return response.data.list;
    } catch (error) {}
};

export { postCheerMessage, getCheerMessageList };
