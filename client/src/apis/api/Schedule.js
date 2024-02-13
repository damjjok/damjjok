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

const postSchedule = async (challengeId, date) => {
    try {
        const response = await axiosInstance.post(`/v1/schedule`, {
            challengeId,
            date: new Date(date.getTime() + 1000 * 60 * 60 * 9).toISOString(),
        });

        if (response.status === 200) {
            console.log("진실의 방 일정 등록 성공!");
            return true;
        }
    } catch (error) {
        console.log(error, 123123);
        return false;
    }

    return false;
};

export { getScheduleByChallengeId, postSchedule };
