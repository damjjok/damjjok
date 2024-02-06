import { useRecoilValue } from "recoil";
import { currentUserState } from "../../../../../contexts/User";
import candyImg from "assets/images/candylogo.png";
import StatusBarToast from "./status-bar-toast/StatusBarToast";
import StatusEditModal from "./status-edit-modal/StatusEditModal";
import { Avatar, Box, Flex, Image, Wrap } from "@chakra-ui/react";
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { challengeState } from "contexts/Challenge";
// import { challengeState } from "../../../../../contexts/Challenge";

function StatusBar() {
    let currentChallenge = useRecoilValue(challengeState);
    const currentUser = currentChallenge.userName;
    let navigate = useNavigate();

    let today = new Date();
    // if (currentChallenge) {
    //     // 가져온 값이 있으면 JSON.parse를 사용해서 문자열을 객체로 변환합니다.
    //     const myChallenge = JSON.parse(currentChallenge);

    //     // 이후 myObject를 원하는대로 사용할 수 있습니다.
    //     currentChallenge = myChallenge[0];
    // } else {
    //     console.log("No data in localStorage");
    //     navigate("./empty-challenge");
    //     return <></>;
    // }

    const startedDate = new Date(currentChallenge.createdAt);

    // 두 날짜 사이의 밀리초 차이를 계산합니다.
    const diffMilliseconds = today.getTime() - startedDate.getTime();
    const diffDays = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000));

    const avatars = [
        { name: "cat1", src: avatar1 },
        { name: "cat2", src: avatar2 },
        { name: "dog1", src: avatar3 },
        { name: "dog2", src: avatar4 },
    ];

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
                            {currentUser} 챌린지 -{" "}
                            {startedDate.toLocaleDateString()}
                        </p>
                        <div className="bg-damblack rounded-xl max-h-8 px-2 text-damyellow">
                            D+{diffDays}
                        </div>
                        <p className="mx-2">{currentChallenge.determination}</p>
                        <StatusEditModal
                            currentChallenge={currentChallenge}
                            avatars={avatars}
                        />
                    </Flex>
                </Wrap>
                <div className="flex items-center">
                    <StatusBarToast />
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
                            1
                        </Flex>
                    </Box>
                </div>
            </Flex>
        </Box>
    );
}

export default StatusBar;
