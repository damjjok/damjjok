const { axiosInstance } = require("apis/instance/AxiosInstance");

const getAttendanceList = async (challengeId, setAttendanceList) => {
    try {
        const response = await axiosInstance.get(`/v1/attendance/${challengeId}`);
        const data = response.data;

        if (response.status === 200) {
            console.log(data.list);
            setAttendanceList(data.list);
        }
    } catch (error) {
        console.log(error);
    }
    return;
};
const createChallenge = async ({ groupId, userId, initialMoney, savedMoney, savedPeriod }) => {
    const body = {
        groupId: groupId,
        userId: userId,
        initialMoney: initialMoney,
        savedMoney: savedMoney,
        savedPeriod: savedPeriod,
    };
    try {
        const response = await axiosInstance.post("/v1/challenge/create");
        if (response.status === 200) return response.data;
        // console.log(response.status);
    } catch (error) {}
};

const getTestimonies = async (challengeId, setTestimonies) => {
    try {
        const response = await axiosInstance.get(`/v1/proof/testimony/${challengeId}`);
        const list = await response.data.list;
        setTestimonies(list);
    } catch (error) {
        console.log(error);
    }
};

const getTestimonyDetail = async (testimonyId, setTestimony) => {
    try {
        const response = await axiosInstance.get(`/v1/proof/testimony/detail/${testimonyId}`);
        if (response.status === 200) {
            const { testimony } = await response.data;
            setTestimony(testimony);
        }
    } catch (error) {
        console.log(error);
    }
};

const postTestimony = async (testimony, challengeId) => {
    try {
        const requestBody = {
            title: testimony.title,
            content: testimony.content,
            challengeId: challengeId,
        };
        const response = await axiosInstance.post(`/v1/proof/testimony`, requestBody);
        if (response.status === 200) {
            console.log("증언 추가 됨");
        }
    } catch (error) {}
};

const postEvidence = async (evidence) => {
    try {
        const formData = new FormData();
        formData.append("challengeId", evidence.challengeId);
        formData.append("title", evidence.title);
        formData.append("image", evidence.image);

        const response = await axiosInstance.postForm(`/v1/proof/evidence`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.status === 200) {
            console.log("증거 생성 완료");
        }
    } catch (error) {
        console.log(error);
    }
};

export { postEvidence, createChallenge, getTestimonies, getAttendanceList, getTestimonyDetail, postTestimony };
