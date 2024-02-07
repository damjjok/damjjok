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

export { getAttendanceList };
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

export { createChallenge };
