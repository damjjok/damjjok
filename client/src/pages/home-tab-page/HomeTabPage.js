import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Strick from "./strick/Strick";
import { challengeState } from "../../contexts/Challenge";
import { currentUserState } from "../../contexts/User";
import InfoCards from "./info-cards/InfoCards";
import { Box, useBreakpointValue, useMediaQuery } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getChallengeInfo } from "apis/api/Group";

// 받아오는 Status에 따라 표출되는 텍스트 달라져야 함
function HomeTabPage() {
    // axios = challengeId 기반으로 challenge 불러오기. (수정해야 함)
    const { groupId, challengeId } = useParams();
    // const setChallengeState = useSetRecoilState(challengeState);
    const currentChallenge = useRecoilValue(challengeState);
    const startedDate = new Date(currentChallenge.createdAt);
    let today = new Date();
    const cur = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const start = new Date(startedDate.getFullYear(), startedDate.getMonth(), startedDate.getDate());

    const isMobile = useBreakpointValue({ base: true, md: false });

    // 이하 내용은 createdAt 데이터 있는 더미 데이터로 테스트할 것.

    // 두 날짜 사이의 밀리초 차이를 계산
    const diffMilliseconds = cur - start;
    const diffDays = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000)) + 1;

    return (
        <Box display={"flex"} flexFlow="column" overflowY={"auto"} height="50vh" className="flex flex-col flex-wrap max-w-7xl" my={6}>
            <div>
                <p className="text-xl font-bold">
                    {currentChallenge.userName}님은 오늘 금연 {diffDays}
                    일차예요!
                </p>
                <Box display={isMobile ? "block" : "flex"} flexWrap={"wrap"} justifyContent={"center"} sx={{ transform: isMobile ? "scale(1)" : "none" }}>
                    <Strick challenge={currentChallenge} startedDate={startedDate} />
                </Box>
            </div>
            <div className="py-8">
                <p className="text-xl font-bold">오늘의 {currentChallenge.userName}님은...</p>
                <div className="flex flex-wrap my-4 justify-center">
                    <InfoCards diffDays={diffDays} diffMilliseconds={diffMilliseconds} challengeId={currentChallenge.challengeId} />
                </div>
            </div>
        </Box>
    );
}

export default HomeTabPage;
