import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://i10e105.p.ssafy.io/api",
    timeout: 5000, // 일단 타임아웃 5초로
    withCredentials: true,
    // headers: {'our-server-token': 'not-yet'} // 우리 서버 아직 토큰 헤더 이름 안나옴...
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // 요청 오류 처리
        return Promise.reject(error);
    },
);

export { axiosInstance };
