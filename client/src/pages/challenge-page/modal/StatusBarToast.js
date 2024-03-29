import { Box, Tooltip, useToast } from "@chakra-ui/react";
import { getAttendanceList, postAttendance } from "apis/api/Attendance";
import { getChallengeCandyCount, postChallengeCandyCount } from "apis/api/Candy";
import BasicButton from "components/button/BasicButton";
import { attendanceListState } from "contexts/Attendance";
import { challengeCandyCount } from "contexts/Challenge";
import { currentUser, currentUserState } from "contexts/User";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

// "현재 로그인된 회원이" "오늘" "이 챌린지에" 출석, 응원 했는지 어떻게 확인하지??
// 현재 상황 : 버튼 활성화 상태가 모든 챌린지에 공유되어 버림.
// 컴포넌트 로드시에 초기화하자니 다른 챌린지로 갔다가 돌아오면 버튼이 초기화되어버림
function StatusBarToast({ challenge, dropCandy }) {
    // const [isClicked, setIsClicked] = useState(false); // 버튼 클릭 여부 확인
    const toast = useToast();
    const loginedUser = useRecoilValue(currentUser);
    const [candyCount, setCandyCount] = useRecoilState(challengeCandyCount);
    const setAttendanceList = useSetRecoilState(attendanceListState);
    // 버튼이 클릭되면, 클릭 감지하는 함수
    const handleButtonClick = async () => {
        // setIsClicked(true);
        if (loginedUser.userId === challenge.userId) {
            const attendanceResponse = await postAttendance(+challenge.challengeId);
            await getAttendanceList(challenge.challengeId, setAttendanceList);
            if (attendanceResponse === false) {
                toast({
                    title: "오늘은 이미 출석했어요",
                    status: "warning",
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "출석 완료!",
                    description: "오늘의 금연도 화이팅이에요!",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
            }
        } else {
            try {
                await postChallengeCandyCount(challenge.challengeId, loginedUser.userId);
                const response = await getChallengeCandyCount(challenge.challengeId);
                const updatedCount = response.count;
                setCandyCount(updatedCount);
                toast({
                    title: "응원 완료!",
                    description: `${challenge.userName} 님을 응원했어요!`,
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                });
                dropCandy();
            } catch (error) {}
        }
    };

    // useEffect(() => {
    //     // 자정에 상태를 초기화하는 함수를 실행하는 타이머를 설정합니다.
    //     const now = new Date();
    //     const tomorrow = new Date(
    //         now.getFullYear(),
    //         now.getMonth(),
    //         now.getDate() + 1,
    //     );
    //     const timeUntilTomorrow = tomorrow - now;

    //     const timerId = setTimeout(
    //         () => setIsClicked(false),
    //         timeUntilTomorrow,
    //     );

    //     return () => clearTimeout(timerId); // 컴포넌트가 언마운트되면 타이머를 취소합니다.
    // }, [isClicked]); // 상태가 변경될 때마다 타이머를 재설정합니다.

    return (
        <Tooltip label={loginedUser.userId === challenge.userId ? "오늘도 화이팅!" : "담쪽이를 응원해 주세요!"} borderRadius={"5px"}>
            <Box>
                <BasicButton
                    onClick={handleButtonClick}
                    // isDisabled={isClicked}
                    buttonName={loginedUser.userId === challenge.userId ? "출석하기" : "응원하기"}
                    variant={"smbtn"}
                ></BasicButton>
            </Box>
        </Tooltip>
    );
}

export default StatusBarToast;
