import { axiosInstance } from "util/axios/AxiosInstance";

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
