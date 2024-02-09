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
        console.log("챌린지 정보 불러오기 실패" + error);
    }
};

export { getGroupList };
