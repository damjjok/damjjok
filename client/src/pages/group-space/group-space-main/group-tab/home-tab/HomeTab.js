import { useRecoilValue } from "recoil";
import Strick from "./strick/Strick";
import { challengeState } from "../../../../../contexts/Challenge";
import { currentUserState } from "../../../../../contexts/User";
import getMoneyGif from "assets/gifs/getMoney.gif";
import { Box, HStack } from "@chakra-ui/react";

function HomeTab() {
    const currentUser = useRecoilValue(currentUserState);
    let currentChallenge = localStorage.getItem("challengeList");
    let today = new Date();
    if (currentChallenge) {
        // 가져온 값이 있으면 JSON.parse를 사용해서 문자열을 객체로 변환합니다.
        const myChallenge = JSON.parse(currentChallenge);

        // 이후 myObject를 원하는대로 사용할 수 있습니다.
        currentChallenge = myChallenge[0];
    } else {
        console.log("No data in localStorage");
    }

    const startedDate = new Date(currentChallenge.createdAt);

    // 두 날짜 사이의 밀리초 차이를 계산합니다.
    const diffMilliseconds = today.getTime() - startedDate.getTime();
    const diffDays = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000));

    return (
        <div className="flex flex-col">
            <div>
                <p className="text-xl font-bold">
                    {currentUser.userName}님! 오늘은 금연 {diffDays}
                    일차예요!
                </p>
                <Strick />
                <p>
                    금연 시작일 : {startedDate.toLocaleDateString()} | 목표일 수
                    : {currentChallenge.duration}일
                </p>
            </div>
            <div className="py-8">
                <p className="text-xl font-bold">
                    오늘의 {currentUser.userName}님은...
                </p>
                <HStack>
                    <Box
                        maxW="xs"
                        maxH="xs"
                        className="flex flex-col items-center rounded-3xl border-4 p-8 border-damyellow shadow-xl"
                    >
                        <img
                            src={getMoneyGif}
                            alt="getMoneyGif"
                            className="w-[150px] min-w-[150px] p-2"
                        />
                        <p className="text-xs text-center font-semibold">
                            하루 1갑 기준
                        </p>
                        <p className=" text-center font-semibold">
                            4500원을 아꼈어요!
                        </p>
                    </Box>
                    <Box>
                        <p>이미지</p>
                        <p className="text-sm font-semibold">
                            전체 챌린저 중 상위 n%에요!
                        </p>
                    </Box>
                    <Box>
                        <p>이미지</p>
                        <p className="text-sm font-semibold">
                            금연 전보다 ㅇㅇ이 n% 좋아졌어요!
                        </p>
                    </Box>
                </HStack>
            </div>
        </div>
    );
}

export default HomeTab;
