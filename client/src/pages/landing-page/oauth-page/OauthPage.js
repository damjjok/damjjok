import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "contexts/Sns";
import { useNavigate } from "react-router-dom";
import { currentUser } from "contexts/User";

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
    }, [navigate, setUser]); //

    useEffect(() => {
        if (user.accessToken) navigate("/create-group");
        else if (user.email != "") navigate("/");
    }, [user]);

    return <div>Oauth Redirect Page</div>;
};

export default OauthPage;
