// 그룹 스페이스 메인 페이지
// 활성화된 챌린지가 있으면 : 챌린지 메인 컴포넌트 보여주기
// 활성화된 챌린지가 없으면 : EmptyChallenge 컴포넌트 (멤버 찾기 / 초대 링크 공유하기 / 새 챌린지 시작하기)

// 수정해야 할 것 : Route 설정
import { useEffect } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
// import { useRecoilValue } from "recoil";
import GroupTab from "./group-tab/GroupTab";
import EmptyChallenge from "./empty-challenge/EmptyChallenge";
import { challengeListState } from "../../../contexts/Challenge";
import CreateChallenge from "./empty-challenge/create-challenge/CreateChallenge";
import { useRecoilState } from "recoil";

// import NormalButton from "../components/button/normalbutton/NormalButton";

function GroupSpaceMain() {
    const [challengeList, setChallengeList] = useRecoilState(challengeListState);
    const navigate = useNavigate();

    useEffect(() => {
        const storedChallengeList = localStorage.getItem("challengeList");
        if (storedChallengeList) {
            setChallengeList(JSON.parse(storedChallengeList));
        } else {
            navigate("empty-challenge");
        }
    }, []);

    return (
        <>
            <Outlet></Outlet>
        </>
    );
}

export default GroupSpaceMain;
