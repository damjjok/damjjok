import Topbar from "../topbar/Topbar.js";
import Sidebar from "../sidebar/Sidebar.js";
import GroupMain from "../group-main/GroupMain.js";
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
                    <GroupMain />
                </div>
            </div>
        </div>
    );
}

export default GroupSpaceHome;

// 이 페이지에서 보여줘야 할 컴포넌트 :
// 탑바, 사이드바, 챌린지 컴포넌트
// 활성화된 챌린지가 있으면 : 챌린지 메인 컴포넌트 보여주기
// 활성화된 챌린지가 없으면 : 멤버 찾기 / 초대 링크 공유하기 / 새 챌린지 시작하기
