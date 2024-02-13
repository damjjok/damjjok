import { axiosInstance } from "util/axios/AxiosInstance";

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

const getGroupInfo = async (groupId) => {
    try {
        const response = await axiosInstance.get(`/v1/group/detail/${groupId}`);
        if (response.status === 200) return response.data.groupDto;
        else console.log("통신 실패" + response.status);
    } catch (error) {
        console.log("그룹 멤버 정보 불러오기 실패" + error);
    }
};

const getGroupMember = async (groupId) => {
    try {
        const response = await axiosInstance.get(
            `/v1/group/${groupId}/user-list`
        );
        if (response.status === 200) return response.data;
        else console.log("통신 실패" + response.status);
    } catch (error) {
        console.log("그룹 멤버 정보 불러오기 실패" + error);
    }
};

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
const postCreateGroup = async (groupName, userIds) => {
    try {
        const response = await axiosInstance.post("/v1/group/create", {
            name: groupName,
            list: userIds,
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

// 사용자 검색 함수
const searchUserByEmail = async (email) => {
    try {
        const response = await axiosInstance.get(
            `/v1/group/search-user/${email}`
        );
        // 검색 결과를 반환합니다.
        if (response.status === 200) {
            console.log("사용자 검색 성공", response.data);
            return response.data.list; // 검색 결과 리스트를 반환합니다.
        } else {
            console.error("사용자 검색 실패: HTTP 상태 코드", response.status);
            return []; // 실패 시 빈 배열 반환
        }
    } catch (error) {
        console.error("사용자 검색 중 에러 발생", error);
        return []; // 에러 발생 시 빈 배열 반환
    }
};

const validateInviationCode = async (code) => {
    try {
        const response = await axiosInstance.get(
            `/v1/group/invite/validate?invitationLink=${code}`
        );
        const data = await response.data;

        if (response.status === 200) {
            return data.groupId;
        }
    } catch (error) {
        console.log(error);
    }
    return null;
};

const joinGroup = async (groupId, list) => {
    try {
        const response = await axiosInstance.post(`/v1/group/join`, {
            groupId,
            list,
        });
        const data = response.data;
        if (response.status === 200) {
            console.log("그룹 가입 성공");
            return groupId;
        }
    } catch (error) {
        console.log(error);
        console.log("이미 가입된 그룹입니다.");
    }

    return null;
};

export {
    getGroupMember,
    getGroupInfo,
    getGroupList,
    postCreateGroup,
    searchUserByEmail,
    validateInviationCode,
    joinGroup,
};
