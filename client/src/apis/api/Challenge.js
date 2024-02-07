const { axiosInstance } = require("apis/instance/AxiosInstance");

const getAttendanceList = async (challengeId, setAttendanceList) => {
    try {
        const response = await axiosInstance.get(
            `/v1/attendance/${challengeId}`
        );
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
const createChallenge = async ({
    groupId,
    userId,
    initialMoney,
    savedMoney,
    savedPeriod,
}) => {
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
        const response = await axiosInstance.get(
            `/v1/proof/testimony/${challengeId}`
        );
        const list = await response.data.list;
        setTestimonies(list);
    } catch (error) {
        console.log(error);
    }
};

const getTestimonyDetail = async (testimonyId, setTestimony) => {
    try {
        const response = await axiosInstance.get(
            `/v1/proof/testimony/detail/${testimonyId}`
        );
        const { testimony } = await response.data;
        setTestimony(testimony);
    } catch (error) {
        console.log(error);
    }
};

export {
    createChallenge,
    getTestimonies,
    getAttendanceList,
    getTestimonyDetail,
};
