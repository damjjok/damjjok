import { axiosInstance } from "apis/instance/AxiosInstance";

const postTest = async () => {
    try {
        const response = await axiosInstance.post("/test");
        console.log(response.status);
    } catch (error) {}
};

const getTest = async () => {
    // 이런 식으로 쓰면 된다의 예시
    try {
        const response = await axiosInstance.get("/test"); // 호출해온 axiosInstance에 baseURL이 적혀있으므로 그 뒤부터 작성해주면 됨.
        console.log(response.status);
    } catch (error) {}
};

const getSessionId = async (propsSessionKey) => {
    const body = {
        sessionKey: propsSessionKey,
    };

    try {
        const response = await axiosInstance.post(
            "/open-vidu/api/sessions",
            body,
        );
        console.log(response.status);
        console.log(response.data);
        if (response.status === 200) return response.data.sessionKey;
        else console.log("통신 실패, 상태 코드: " + response.status);
    } catch (error) {
        console.log("오픈비두 세션 id 통신에서 에러: " + error);
    }
};

export { getSessionId };
