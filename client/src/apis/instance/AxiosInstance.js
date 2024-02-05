import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://i10e105.p.ssafy.io/api",
    timeout: 5000, // 일단 타임아웃 5초로
    // headers: {'our-server-token': 'not-yet'} // 우리 서버 아직 토큰 헤더 이름 안나옴...
});
