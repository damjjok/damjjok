const { axiosInstance } = require("apis/instance/AxiosInstance");

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
        const response = await axiosInstance.post("/v1/challenge/create", body);
        if (response.status === 200) return response.data;
        // console.log(response.status);
    } catch (error) {}
};

export { createChallenge };
