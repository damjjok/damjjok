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
// import { challengeState } from "../../../../../contexts/Challenge";

// profilePath 올바르게 설정될 필요성
function StatusBar() {
    const challenge = useRecoilValue(challengeState);
    const challengeUserId = challenge.userId;
    const loginedUser = useRecoilValue(currentUser);
    // console.log(loginedUser);
    const [candyCount, setCandyCount] = useRecoilState(challengeCandyCount);
    // const [currentCandyCount, setCurrentCandyCount] =
    //     useRecoilState(challengeCandyCount);

    const [currentStatus, setStatus] = useRecoilState(challengeStatusState);

    const isMobile = useBreakpointValue({ base: true, md: false });

    let today = new Date();

    const startedDate = new Date(challenge.createdAt);

    // 두 날짜 사이의 밀리초 차이를 계산합니다.
    const diffMilliseconds = today.getTime() - startedDate.getTime();
    const diffDays = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000));

    useEffect(() => {
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
    }, [challenge, setCandyCount]);

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
                            src={challenge.profilePath}
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
                        <StatusBarToast challenge={challenge} />
                    ) : null}

                    <Box
                        position="relative"
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
                            />
                        </Box>
                        <Flex
                            bgColor={"black"}
                            position="absolute"
                            top="0"
                            right="0"
                            bottom="0"
                            left="0"
                            borderRadius={"full"}
                            alignItems="center"
                            justifyContent="center"
                            fontSize="xs"
                            opacity="0"
                            _groupHover={{ opacity: "1" }}
                            transition="opacity 0.2s"
                            textColor={"white"}
                        >
                            {candyCount}
                        </Flex>
                    </Box>
                </div>
            </Flex>
        </Box>
    );
}

export default StatusBar;
