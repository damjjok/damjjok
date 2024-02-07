const { axiosInstance } = require("apis/instance/AxiosInstance");

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

const getChallengeList = async (groupId) => {
    try {
        const response = await axiosInstance.get(
            `/v1/challenge/list/${groupId}`,
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
            `/v1/challenge/${challengeId}/detail`,
        );
        if (response.status === 200) return response.data;
        else console.log("통신 실패" + response.status);
    } catch (error) {
        console.log("챌린지 정보 불러오기 실패" + error);
    }
};

const getGroupMember = async (groupId) => {
    try {
        const response = await axiosInstance.get(
            `/v1/group/${groupId}/user-list`,
        );
        if (response.status === 200) return response.data;
        else console.log("통신 실패" + response.status);
    } catch (error) {
        console.log("그룹 멤버 정보 불러오기 실패" + error);
    }
};

export { getChallengeList, getChallengeInfo, getGroupMember };
