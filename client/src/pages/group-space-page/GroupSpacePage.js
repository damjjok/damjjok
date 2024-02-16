import Topbar from "./topbar/Topbar.js";
import Sidebar from "./sidebar/Sidebar.js";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import GroupSpaceMain from "./group-space-main/GroupSpaceMain.js";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { challengeListState } from "contexts/Challenge.js";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getChallengeInfo, getChallengeList } from "apis/api/Challenge.js";
import { getGroupInfo } from "apis/api/Group.js";
import { currentGroupState } from "contexts/Group.js";

// 회원 정보 Get API
function GroupSpacePage() {
    const isMobile = useBreakpointValue({ base: true, md: false });

    const { groupId } = useParams();
    const setCurrentGroup = useSetRecoilState(currentGroupState);

    const fetchGroupDetail = async () => {
        const group = await getGroupInfo(groupId);
        setCurrentGroup(group);
    };

    useEffect(() => {
        console.log("111111 : ", groupId);
        fetchGroupDetail();
    }, [groupId]);

    return (
        <>
            <Topbar />
            <div className="flex">
                <Box
                    position={isMobile ? "fixed" : "static"}
                    bottom={isMobile ? "10vw" : "auto"}
                    left={isMobile ? "10px" : "auto"}
                    zIndex={"docked"}
                >
                    <Sidebar />
                </Box>
                <Box className="w-full">
                    <GroupSpaceMain />
                </Box>
            </div>
        </>
    );
}

export default GroupSpacePage;

// 이 페이지에서 보여줘야 할 컴포넌트 :
// 탑바, 사이드바, 그룹스페이스 컴포넌트
