import { stepState } from "contexts/TruthRoomSocket";
import React, { useRef, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function OpenViduVideoComponent({ streamManager, styleProps }) {
    const step = useRecoilValue(stepState);
    const videoRef = useRef();
    const [roleStyle, setRoleStyle] = useState({});

    const getRole = () => {
        // Gets the nickName of the user
        return JSON.parse(streamManager.stream.connection.data).clientData.role;
    };

    useEffect(() => {
        // 역할이 담쪽이일 때 노란색 테두리 적용하기 위함
        const role = getRole();
        if (role === "Damjjok" && step !== 4)
            setRoleStyle({ border: "3px solid yellow" });
    }, [streamManager]);

    useEffect(() => {
        if (streamManager && videoRef.current) {
            streamManager.addVideoElement(videoRef.current);
        }
    }, [streamManager]);

    return (
        <video autoPlay={true} ref={videoRef} style={(roleStyle, styleProps)} />
    );
}
