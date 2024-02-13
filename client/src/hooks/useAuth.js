import { currentUser } from "contexts/User";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const useAuth = () => {
    const [user, setUser] = useRecoilState(currentUser);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
        }
    }, []);

    // 로그아웃 함수
    const logout = () => {
        localStorage.removeItem("accessToken"); // 토큰 삭제
        setUser(null); // 사용자 상태 초기화
    };

    return { user, logout };
};

export default useAuth;
