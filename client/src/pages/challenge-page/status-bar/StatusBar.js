import { useRecoilState, useRecoilValue } from "recoil";
import { currentUser, currentUserState } from "../../../contexts/User";
import candyImg from "assets/images/candylogo.png";
import StatusBarToast from "../modal/StatusBarToast";
import StatusEditModal from "../modal/StatusEditModal";
import {
    Avatar,
    Box,
    Flex,
    Image,
    Text,
    VStack,
    Wrap,
    useBreakpointValue,
} from "@chakra-ui/react";

import {
    challengeAvatarState,
    challengeCandyCount,
    challengeState,
    challengeStatusState,
} from "contexts/Challenge";
import { useEffect, useState } from "react";
import { getChallengeCandyCount } from "apis/api/Candy";
import { getAttendanceList } from "apis/api/Attendance";
import { getChallengeInfo } from "apis/api/Challenge";
import ThrowingCandy from "../ThrowingCandy";
// import { challengeState } from "../../../../../contexts/Challenge";

// profilePath 올바르게 설정될 필요성
function StatusBar() {
    const [challenge, setChallenge] = useRecoilState(challengeState);
    const challengeUserId = challenge.userId;
    const loginedUser = useRecoilValue(currentUser);
    // console.log(loginedUser);
    const [candyCount, setCandyCount] = useRecoilState(challengeCandyCount);
    // const [currentCandyCount, setCurrentCandyCount] =
    //     useRecoilState(challengeCandyCount);

    const [currentStatus, setStatus] = useRecoilState(challengeStatusState);

    const isMobile = useBreakpointValue({ base: true, md: false });
    const profileImg = challenge.profilePath
        ? require(`../../../assets/images/${challenge.profilePath}`)
        : " ";

    let today = new Date();

    const startedDate = new Date(challenge.createdAt);
    const cur = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );
    const start = new Date(
        startedDate.getFullYear(),
        startedDate.getMonth(),
        startedDate.getDate()
    );

    // 두 날짜 사이의 밀리초 차이를 계산합니다.
    const diffMilliseconds = cur - start;
    const diffDays = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000)) + 1;

    useEffect(() => {
        if (!challenge.challengeId) return;
        const fetchChallengeData = async () => {
            try {
                const response = await getChallengeInfo(challenge.challengeId);
                console.log(response);
                const updatedChallenge = response.dto;
                setChallenge(updatedChallenge);
            } catch (error) {
                console.log(error);
            }
        };
        fetchChallengeData();
    }, []);

    useEffect(() => {
        if (!challenge.challengeId) return;
        const fetchCandyData = async () => {
            try {
                const response = await getChallengeCandyCount(
                    challenge.challengeId
                );
                const updatedCount = response.count;
                setCandyCount(updatedCount); // Recoil 상태에 데이터 적용
                // console.log(response);
            } catch (error) {
                console.error("캔디 정보 불러오기 실패", error);
            }
        };

        const fetchAttendanceData = async () => {
            try {
                const response = await getAttendanceList(challenge.challengeId);
                const currentAttendanceList = response.list;
            } catch (error) {
                console.error("춣석 정보 불러오기 실패", error);
            }
        };

        if (challenge.challengeId === loginedUser.userId) {
            fetchAttendanceData();
        } else {
            fetchCandyData(); // fetchData 함수 호출
        }
    }, [challenge, candyCount]);

    const [candies, setCandies] = useState([]);
    const [lastCandy, setLastCandy] = useState(Date.now());
    useEffect(() => {
        // 마지막으로 사탕이 떨어진 시간을 기준으로 2초 후에 실행
        const timer = setTimeout(() => {
            // 배열에서 첫 번째 사탕을 제거
            setCandies([]);
        }, 2000); // 마지막 사탕이 떨어진 후 2초를 기다림

        return () => clearTimeout(timer);
    }, [candies]); // lastDroppedTime이나 candies가 변경될 때마다 실행

    const dropCandy = () => {
        // left 값을 0에서 100% 사이의 랜덤 값으로 설정
        const leftPosition = Math.random() * 100;

        // 새로운 사탕 객체를 candies 배열에 추가
        const newCandy = {
            id: Date.now(), // 간단한 ID 할당
            left: leftPosition,
        };

        setCandies([...candies, newCandy]);
        setLastCandy(newCandy.id);
    };

    return (
        <Box width={isMobile ? "90vw" : "80vw"} marginY={"0.5rem"}>
            <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                bg={"dam.gray"}
                borderRadius={"30px"}
                paddingX={".5rem"}
                height={"40px"}
            >
                <Wrap>
                    <Flex alignItems={"center"}>
                        <Avatar
                            name="challengeProfileImg"
                            src={profileImg}
                            size="sm"
                            bg="dam.white"
                        />
                        {isMobile ? (
                            <Flex flexFlow={"column"} px={3}>
                                <Text fontSize={"sm"} fontWeight={"bold"}>
                                    {challenge.userName} 챌린지
                                </Text>
                                <Text fontSize={"xx-small"}>
                                    {startedDate.toLocaleDateString()}
                                </Text>
                            </Flex>
                        ) : (
                            <Text fontSize={"lg"} className="px-3 font-bold">
                                {challenge.userName} 챌린지 -{" "}
                                {startedDate.toLocaleDateString()}
                            </Text>
                        )}

                        <div className="bg-damblack rounded-xl max-h-8 px-2 text-damyellow">
                            D+{diffDays}
                        </div>
                        {isMobile ? null : (
                            <p className="mx-2">{challenge.determination}</p>
                        )}

                        {/* EditModal axios 적용해야 함 */}
                        {/* 요청 API : /api/v1/challenge/{challengeId}/profile-modify */}
                        {challenge.userId === loginedUser.userId &&
                        challenge.status === "PROGRESS" ? (
                            <StatusEditModal
                                currentChallenge={challenge}
                                selectedAvatar={currentStatus.profilePath}
                            />
                        ) : null}
                    </Flex>
                </Wrap>
                <div className="flex items-center">
                    {challenge.status === "PROGRESS" ? (
                        <StatusBarToast
                            challenge={challenge}
                            dropCandy={dropCandy}
                        />
                    ) : null}

                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        role="group"
                        marginLeft={3}
                    >
                        <Box className="bg-damwhite rounded-full border border-damyellow">
                            <Image
                                src={candyImg}
                                alt="candyImg"
                                boxSize="25px"
                                _groupHover={{ opacity: "0.5" }}
                                transition="opacity 0.2s"
                                onClick={() => {}}
                            />
                            <Box position={"relative"}>
                                <Flex
                                    boxSize={"25px"}
                                    position={"absolute"}
                                    left={0}
                                    top={"-25px"}
                                    bgColor={"black"}
                                    borderRadius={"full"}
                                    alignItems="center"
                                    justifyContent="center"
                                    fontSize="xs"
                                    opacity="0"
                                    _groupHover={{ opacity: "1" }}
                                    transition="opacity 0.2s"
                                    textColor={"white"}
                                >
                                    <Box>{candyCount}</Box>
                                </Flex>
                            </Box>
                        </Box>
                    </Box>
                </div>
            </Flex>

            <ThrowingCandy candies={candies}></ThrowingCandy>
        </Box>
    );
}

export default StatusBar;
