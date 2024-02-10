import { axiosInstance } from "util/axios/AxiosInstance";

const getNotificationList = async () => {
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

const checkNotification = async (notificationId) => {
    try {
        const response = await axiosInstance.patch(`/v1/notification/`, {
            notificationId,
        });

        if (response.status === 200) {
            console.log("알림 읽음 체크");
        }
    } catch (error) {
        console.log(error);
    }

    return [];
};

export { getNotificationList, checkNotification };
