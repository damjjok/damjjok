import { axiosInstance } from "apis/instance/AxiosInstance";

// const getChallengeList = async (groupId) => {
//     try {
//         const response = await axiosInstance.get(
//             `/v1/challenge/list/${groupId}`,
//         );
//         if (response.status === 200) return response.data;
//         else console.log("통신 실패" + response.status);
//     } catch (error) {
//         console.log("챌린지 정보 불러오기 실패" + error);
//     }
// };

const getGroupList = async () => {
    try {
        const response = await axiosInstance.get("/v1/group/user/group-list");
        if (response.status === 200) return response.data;
        else console.log("통신실패" + response.status);
    } catch (error) {
        console.log("그룹 리스트 불러오기 실패" + error);
    }
};

// 그룹을 생성하는 함수
const postCreateGroup = async (groupName) => {
    try {
        const response = await axiosInstance.post("/v1/group/create", {
            name: groupName,
        });

        if (response.status === 200) {
            console.log("그룹 생성 성공", response.data);
            return response.data;
        } else {
            console.error("그룹 생성 실패: HTTP 상태 코드", response.status);
        }
    } catch (error) {
        console.error("그룹 생성 중 에러 발생", error);
    }
};

export { getGroupList, postCreateGroup };
