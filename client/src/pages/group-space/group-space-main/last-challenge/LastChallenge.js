import { useLocation } from "react-router-dom";
import StatusBar from "./status-bar/StatusBar";
import HomeTab from "../group-tab/home-tab/HomeTab";
import TitleText from "components/TitleText";
import bgSucceedChallenge from "assets/images/bgSucceedChallenge.png";
import bgFailedChallenge from "assets/images/bgFailedChallenge.png";
import { Box, VStack } from "@chakra-ui/react";
import BasicButton from "components/button/BasicButton";

function LastChallenge() {
    const location = useLocation();
    const challenge = location.state.challenge;
    const tabName =
        challenge.status === "success" ? "성공한 챌린지" : "실패한 챌린지";
    const description =
        challenge.status === "success"
            ? "이전에 성공한 챌린지 정보를 볼 수 있어요"
            : "이전에 실패한 챌린지 정보를 볼 수 있어요";
    const bgImage =
        challenge.status === "success" ? bgSucceedChallenge : bgFailedChallenge;
    return (
        <>
            <VStack marginBottom={15}>
                <TitleText
                    fontSize="2rem"
                    img={bgImage}
                    description={description}
                >
                    {tabName}
                </TitleText>
                <StatusBar challenge={challenge} />
                <Box
                    display={"flex"}
                    flexFlow={"column"}
                    alignItems={"center"}
                    width={"70vw"}
                    overflowY={"auto"}
                    height="50vh"
                >
                    <HomeTab challengeId={challenge.challengeId} />
                    <BasicButton
                        buttonName={"리워드 다시보기"}
                        variant={"bigbtn"}
                    />
                </Box>
            </VStack>
        </>
    );
}

export default LastChallenge;
