import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState } from "../../../../../contexts/User";
import candyImg from "assets/images/candylogo.png";
import StatusBarToast from "./status-bar-toast/StatusBarToast";
import StatusEditModal from "./status-edit-modal/StatusEditModal";
import { Avatar, Box, Flex, Image, Wrap } from "@chakra-ui/react";
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import { challengeCandyCount, challengeState } from "contexts/Challenge";
import { useEffect } from "react";
import { getChallengeCandyCount } from "apis/api/Challenge";
// import { challengeState } from "../../../../../contexts/Challenge";

// profilePath 올바르게 설정될 필요성
function StatusBar() {
    const challenge = useRecoilValue(challengeState);
    const challengeUserId = challenge.userId;
    const currentUser = useRecoilValue(currentUserState)
    const [candyCount, setCandyCount] = useRecoilState(challengeCandyCount)
    const currentCandyCount = useRecoilValue(challengeCandyCount)
    // let navigate = useNavigate();

    let today = new Date();

    const startedDate = new Date(challenge.createdAt);

    // 두 날짜 사이의 밀리초 차이를 계산합니다.
    const diffMilliseconds = today.getTime() - startedDate.getTime();
    const diffDays = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000));

    const avatars = [
        { name: "cat1", src: avatar1 },
        { name: "cat2", src: avatar2 },
        { name: "dog1", src: avatar3 },
        { name: "dog2", src: avatar4 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getChallengeCandyCount(challenge.challengeId);
                const updatedCount = response.count
                setCandyCount(updatedCount); // Recoil 상태에 데이터 적용
                // console.log(response);
    
            } catch (error) {
                console.error("챌린지 정보 불러오기 실패", error);
            }
                };
    
                fetchData(); // fetchData 함수 호출
            }, 
            [challenge, setCandyCount]
            );

    return (
        <Box width={"80vw"} marginY={"0.5rem"}>
            <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                bg={"dam.gray"}
                borderRadius={"30px"}
                paddingX={".5rem"}
            >
                <Wrap>
                    <Flex alignItems={"center"}>
                        <Avatar
                            name="Cat"
                            src={avatar1}
                            size="sm"
                            bg="dam.white"
                        />
                        <p className="px-3 text-lg font-bold">
                            {challenge.userName} 챌린지 -{" "}
                            {startedDate.toLocaleDateString()}
                        </p>
                        <div className="bg-damblack rounded-xl max-h-8 px-2 text-damyellow">
                            D+{diffDays}
                        </div>
                        <p className="mx-2">{challenge.determination}</p>
                        {/* EditModal axios 적용해야 함 */}
                        {/* 요청 API : /api/v1/challenge/{challengeId}/profile-modify */}
                        <StatusEditModal
                            currentChallenge={challenge}
                            avatars={avatars}
                        />
                    </Flex>
                </Wrap>
                <div className="flex items-center">
                    <StatusBarToast challenge={challenge} />
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
