import { axiosInstance } from "util/axios/AxiosInstance";

const getAlarmList = async () => {
    try {
        const response = await axiosInstance.get(`/v1/notification`);
        if (response.status === 200) {
            return response.data.list;
        }
    } catch (error) {
        console.log(error);
    }
    return null;
};

export { getAlarmList };
