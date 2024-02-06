import GroupList from "./group-list/GroupList";
import ChallengeList from "./challenge-list/ChallengeList";
import SettingButton from "./setting-button/SettingButton";
import { Box, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getChallengeList } from "apis/api/Group";

function Sidebar() {
    const userId = 0;

    const { groupId } = useParams();
    // const setChallengeState = useSetRecoilState(challengeState);
    const [currentChallengeList, setCurrentChallengeList] =
        useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getChallengeList(groupId);
                const updatedChallengeList = response.list
                setCurrentChallengeList(updatedChallengeList); // Recoil 상태에 데이터 적용

            } catch (error) {
                console.error("챌린지 정보 불러오기 실패", error);
            }
        };

        fetchData(); // fetchData 함수 호출
    }, [groupId]
    );

    return (
        <Box borderRight={"1px solid rgba(214,214,214,0.25)"} height={"90vh"} minWidth={'250px'} width={"20vw"} maxWidth={'250px'}>
            <div className="flex flex-col h-300px px-4">
                <Flex justifyContent="space-between" alignItems="center" className="my-8">
                    <GroupList />
                    <SettingButton />
                </Flex>
                <div className="my-8">
                    <ChallengeList currentChallengeList={currentChallengeList} />
                </div>
            </div>
        </Box>
    );
}

export default Sidebar;
