import Topbar from "./topbar/Topbar.js";
import Sidebar from "./sidebar/Sidebar.js";
import GroupSpaceMain from "./group-space-main/GroupSpaceMain.js";
// import StatusBar from "../statusbar/StatusBar.js";
// import { Routes, Route } from "react-router-dom";
// import CreateChallenge from "../create-challenge/CreateChallenge"

function GroupSpaceHome() {
    return (
        <div>
            <Topbar />
            <div className="flex">
                <Sidebar />
                <div className="w-full px-8">
                    <GroupSpaceMain />
                </div>
            </div>
        </div>
    );
}

export default GroupSpaceHome;

// 이 페이지에서 보여줘야 할 컴포넌트 :
// 탑바, 사이드바, 그룹스페이스 컴포넌트
