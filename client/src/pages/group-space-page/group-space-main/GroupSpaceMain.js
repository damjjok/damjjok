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
import { currentUserState } from "contexts/User";

// import NormalButton from "../components/button/normalbutton/NormalButton";

function GroupSpaceMain() {
    // 더미데이터
    const userId = useRecoilValue(currentUserState);

    const { groupId } = useParams();
    // console.log(groupId);
    // const setChallengeState = useSetRecoilState(challengeState);
    const [currentChallengeList, setCurrentChallengeList] =
        useRecoilState(challengeListState);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getChallengeList(groupId);
                const updatedChallengeList = response.list;
                setCurrentChallengeList(updatedChallengeList); // Recoil 상태에 데이터 적용
                // console.log(currentChallengeList);
                const currentMyChallenge = updatedChallengeList.find(
                    (challenge) =>
                        challenge.userId === userId &&
                        challenge.status === "PROGRESS"
                );
                // setChallengeState(currentMyChallenge);
                // console.log(currentMyChallenge);

                if (currentMyChallenge) {
                    navigate(`challenge/${currentMyChallenge.challengeId}`);
                } else if (!currentMyChallenge && currentChallengeList) {
                    navigate(
                        `challenge/${updatedChallengeList[0].challengeId}`
                    );
                } else {
                    navigate("empty-challenge");
                }
            } catch (error) {
                console.error("챌린지 정보 불러오기 실패", error);
            }
        };

        fetchData(); // fetchData 함수 호출
    }, [groupId]);

    return (
        <>
            <Outlet></Outlet>
        </>
    );
}

export default GroupSpaceMain;
