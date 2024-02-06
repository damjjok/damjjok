const { axiosInstance } = require("apis/instance/AxiosInstance");

const getAttendanceList = async (challengeId, setAttendanceList) => {
    try {
        const response = await axiosInstance.get(`/v1/attendance/${challengeId}`);
        const data = response.data;

        if (response.status === 200) {
            setAttendanceList(data.list);
        }
    } catch (error) {
        console.log(error);
    }
    return;
};

export { getAttendanceList };
