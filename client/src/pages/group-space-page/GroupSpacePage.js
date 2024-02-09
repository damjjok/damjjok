import Topbar from "./topbar/Topbar.js";
import Sidebar from "./sidebar/Sidebar.js";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import GroupSpaceMain from "./group-space-main/GroupSpaceMain.js";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { challengeListState } from "contexts/Challenge.js";
import { currentUserState } from "contexts/User.js";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getChallengeList } from "apis/api/Challenge.js";

// 회원 정보 Get API
function GroupSpacePage() {
    const isMobile = useBreakpointValue({ base: true, md: false });

    //더미데이터 : currentUser로 바꿔줘야 함
    const userId = useRecoilValue(currentUserState);

    const { groupId } = useParams();
    // console.log(groupId);
    // const setChallengeState = useSetRecoilState(challengeState);
    const [currentChallengeList, setCurrentChallengeList] =
        useRecoilState(challengeListState);
    const resetChallengeList = useResetRecoilState(challengeListState);

    // 페이지가 로드될 때 challengeListState를 리셋
    useEffect(() => {
        resetChallengeList();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getChallengeList(groupId);
                const updatedChallengeList = response.list;
                setCurrentChallengeList(updatedChallengeList); // Recoil 상태에 데이터 적용
                // console.log(currentChallengeList);
            } catch (error) {
                console.error("챌린지 정보 불러오기 실패", error);
            }
        };

        fetchData(); // fetchData 함수 호출
    }, [groupId, setCurrentChallengeList]);

    return (
        <div>
            <Topbar />
            <div className="flex">
                <Box
                    position={isMobile ? "fixed" : "static"}
                    bottom={isMobile ? "10px" : "auto"}
                    left={isMobile ? "10px" : "auto"}
                    zIndex={"docked"}
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

export default GroupSpacePage;

// 이 페이지에서 보여줘야 할 컴포넌트 :
// 탑바, 사이드바, 그룹스페이스 컴포넌트
