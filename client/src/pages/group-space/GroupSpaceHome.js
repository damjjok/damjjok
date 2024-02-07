import Topbar from "./topbar/Topbar.js";
import Sidebar from "./sidebar/Sidebar.js";
import GroupSpaceMain from "./group-space-main/GroupSpaceMain.js";
import { Box, useMediaQuery } from "@chakra-ui/react";
// import StatusBar from "../statusbar/StatusBar.js";
// import { Routes, Route } from "react-router-dom";
// import CreateChallenge from "../create-challenge/CreateChallenge"

// 회원 정보 Get API
function GroupSpaceHome() {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
    // const challengeDetail = getChallengeInfo(challengeId);
    // console.log(challengeDetail);

    return (
        <div>
            <Topbar />
            <div className="flex">
                <Box
                position={isSmallerThan768 ? "fixed" : "static"}
                bottom={isSmallerThan768 ? "10px" : "auto"}
                left={isSmallerThan768 ? "10px" : "auto"}
                >
                    <Sidebar />
                </Box>
                <Box className="w-full px-8">
                    <GroupSpaceMain />
                </Box>
            </div>
        </div>
    );
}

export default GroupSpaceHome;

// 이 페이지에서 보여줘야 할 컴포넌트 :
// 탑바, 사이드바, 그룹스페이스 컴포넌트
