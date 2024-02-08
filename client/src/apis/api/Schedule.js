import { axiosInstance } from "util/axios/AxiosInstance";

const getScheduleByChallengeId = async (challengeId, setSchdule) => {
    try {
        const response = await axiosInstance.get(`/v1/schedule/${challengeId}`);
        const data = response.data;
        if (response.status === 200) setSchdule(data);
    } catch (error) {
        console.log(error);
    }
};

export { getScheduleByChallengeId };
