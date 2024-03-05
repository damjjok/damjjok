// 그룹 스페이스 메인 페이지
// 활성화된 챌린지가 있으면 : 챌린지 메인 컴포넌트 보여주기
// 활성화된 챌린지가 없으면 : EmptyChallenge 컴포넌트 (멤버 찾기 / 초대 링크 공유하기 / 새 챌린지 시작하기)

// 수정해야 할 것 : Route 설정
import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

function GroupSpaceMain() {
    return (
        <>
            <Outlet></Outlet>
        </>
    );
}

export default GroupSpaceMain;
