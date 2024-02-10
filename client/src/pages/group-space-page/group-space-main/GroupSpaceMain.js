// 그룹 스페이스 메인 페이지
// 활성화된 챌린지가 있으면 : 챌린지 메인 컴포넌트 보여주기
// 활성화된 챌린지가 없으면 : EmptyChallenge 컴포넌트 (멤버 찾기 / 초대 링크 공유하기 / 새 챌린지 시작하기)

// 수정해야 할 것 : Route 설정
import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
// import { useRecoilValue } from "recoil";
import ChallengePage from "../../challenge-page/ChallengePage";
import EmptyChallengePage from "../../empty-challenge-page/EmptyChallengePage";
import {
    challengeListState,
    challengeState,
} from "../../../contexts/Challenge";
import CreateChallengePage from "../../create-challenge-page/CreateChallengePage";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getChallengeList } from "apis/api/Challenge";
import { currentUser, currentUserState } from "contexts/User";

// import NormalButton from "../components/button/normalbutton/NormalButton";

function GroupSpaceMain() {
    const loginedUser = useRecoilValue(currentUser);

    const { groupId } = useParams();
    // console.log(groupId);
    // const setChallengeState = useSetRecoilState(challengeState);
    const currentChallengeList = useRecoilValue(challengeListState);
    const navigate = useNavigate();

    useEffect(() => {
        // currentChallengeList가 정의되어 있고, 그 길이가 0보다 클 때만 로직 실행
        if (currentChallengeList && currentChallengeList.length > 0) {
            const currentMyChallenge = currentChallengeList.find(
                (challenge) =>
                    challenge.userId === loginedUser.userId &&
                    challenge.status === "PROGRESS"
            );

            if (currentMyChallenge) {
                navigate(`challenge/${currentMyChallenge.challengeId}`);
            } else {
                const randomCurrentChallenge = currentChallengeList.find(
                    (challenge) => challenge.status === "PROGRESS"
                );
                if (randomCurrentChallenge) {
                    navigate(`challenge/${randomCurrentChallenge.challengeId}`);
                }
            }
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
