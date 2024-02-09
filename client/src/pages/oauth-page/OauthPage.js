import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "contexts/Sns";
import { useNavigate } from "react-router-dom";
import { currentUser } from "contexts/User";
import { jwtDecode } from "jwt-decode";
import { requestForToken } from "util/firebase/firebaseMessaging";

const OauthPage = () => {
    const [user, setUser] = useRecoilState(userState);
    const [currentUserInfo, setCurrentUserInfo] = useRecoilState(currentUser);

    const navigate = useNavigate();

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const accessToken = urlParams.get("accessToken");
        const refreshToken = urlParams.get("refreshToken");
        const name = urlParams.get("name");
        const email = urlParams.get("email");

        const userInfo = {
            name,
            email,
            accessToken,
            refreshToken,
        };
        setUser(userInfo);
        // 로컬 스토리지에 토큰 저장
        if (accessToken && refreshToken) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
        }

        if (accessToken) {
            try {
                const decoded = jwtDecode(accessToken);
                console.log(decoded);
                setCurrentUserInfo(decoded); // 토큰에서 추출한 사용자 정보를 저장

                // 로그인 성공 후 fcm 토큰 요청
                requestForToken(accessToken);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [navigate, setUser, setCurrentUserInfo]); //

    useEffect(() => {
        if (user.accessToken) navigate("/group-list");
        else if (user.email != "") navigate("/");
    }, [user, navigate]);
    // currentUserInfo 상태의 변화를 감지하고 콘솔에 로그 출력
    // useEffect(() => {
    //     console.log("Updated currentUserInfo:", currentUserInfo);
    // }, [currentUserInfo]);

    return <div>Oauth Redirect Page</div>;
    //"https://i10e105.p.ssafy.io/api/v1/auth/fcmToken"
};

export default OauthPage;
