import { axiosInstance } from "util/axios/AxiosInstance";

const getSessionId = async (propsSessionKey) => {
    const body = {
        sessionKey: propsSessionKey,
    };

    try {
        const response = await axiosInstance.post("/v1/sessions", body);
        if (response.status === 200) return response.data;
        else console.log("통신 실패, 상태 코드: " + response.status);
    } catch (error) {
        console.log("오픈비두 세션 id 통신에서 에러: " + error);
    }
};

const getOpenviduToken = async (propsSessionId) => {
    try {
        const response = await axiosInstance.post(
            `/v1/sessions/${propsSessionId}/connections`
        );
        if (response.status === 200) return response.data.token;
        else console.log("통신 실패, 상태 코드: " + response.status);
    } catch (error) {
        console.log("오픈비두 토큰 발급 통신에서 에러: " + error);
    }
};

const closeOpenviduSession = async (propsSessionKey) => {
    // 마지막 유저가 나갈 때 실행되는 통신
    try {
        const response = await axiosInstance.delete(
            `/v1/sessions/${propsSessionKey}`
        );
        if (response.status === 200) console.log("세션 닫기 성공");
        else console.log("통신 실패, 상태 코드: " + response.status);
    } catch (error) {
        console.log("오픈비두 세션 닫기 통신에서 에러: " + error);
    }
};

export { getSessionId, getOpenviduToken, closeOpenviduSession };
