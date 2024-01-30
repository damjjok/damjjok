// 진행중인 챌린지가 있을 때 보여주는 페이지
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import GroupTab from "../group-tab/GroupTab";
import EmptyChallenge from "../empty-challenge/EmptyChallenge";
import { challengeState, challengeListState } from "../../../context/Challenge";
import CreateChallenge from "../create-challenge/CreateChallenge";
import { useRecoilState } from "recoil";

// import NormalButton from "../components/button/normalbutton/NormalButton";

function GroupSpaceMain() {
    const [challengeList, setChallengeList] =
        useRecoilState(challengeListState);

    useEffect(() => {
        const storedChallengeList = localStorage.getItem("challengeList");
        if (storedChallengeList) {
            setChallengeList(JSON.parse(storedChallengeList));
        }
    }, []);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    challengeList.length !== 0 ? (
                        <GroupTab />
                    ) : (
                        <EmptyChallenge />
                    )
                }
            />
            <Route path="createChallenge" element={<CreateChallenge />} />
        </Routes>
    );
}

export default GroupSpaceMain;
