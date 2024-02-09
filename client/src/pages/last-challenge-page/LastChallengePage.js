import { useLocation } from "react-router-dom";
import HomeTabPage from "../home-tab-page/HomeTabPage";
import TitleText from "components/TitleText";
import bgSucceedChallenge from "assets/images/bgSucceedChallenge.png";
import bgFailedChallenge from "assets/images/bgFailedChallenge.png";
import { Box, Heading, VStack } from "@chakra-ui/react";
import MessageCheckModal from "../challenge-page/modal/completed-modal/message-check-modal/MessageCheckModal";
import PiggyBankFinished from "../challenge-page/modal/completed-modal/piggy-bank/PiggyBankFinished";
import StatusBar from "../challenge-page/status-bar/StatusBar";
import Strick from "../home-tab-page/strick/Strick";
import InfoCards from "../home-tab-page/info-cards/InfoCards";

function LastChallengePage() {
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
    const isExpired = "True";

    console.log(challenge);

    //더미
    const endDate = new Date(challenge.endDate);
    const startedDate = new Date(challenge.createdAt);
    const diffMilliseconds = endDate.getTime() - startedDate.getTime();
    const diffDays = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000));

    return (
        <>
            <VStack marginBottom={15}>
                <StatusBar challenge={challenge} />
                <TitleText
                    fontSize="2rem"
                    img={bgImage}
                    description={description}
                >
                    {tabName}
                </TitleText>

                <Box
                    display={"flex"}
                    flexFlow={"column"}
                    alignItems={"center"}
                    width={"80vw"}
                    overflowY={"auto"}
                    height="50vh"
                    marginY={10}
                    // height="120vh"
                >
                    <VStack spacing={"30px"} mb={20}>
                        {challenge.status === "success" ? (
                            <Heading>
                                {challenge.userName}님이 성공했던 금연
                                기록이에요!
                            </Heading>
                        ) : (
                            <Heading>
                                {challenge.userName}님이 금연하려 했던 노력은...
                            </Heading>
                        )}
                        <Strick startedDate={startedDate} />
                        <Heading></Heading>
                        <InfoCards
                            diffDays={diffDays}
                            diffMilliseconds={diffMilliseconds}
                            challengeId={challenge.challengeId}
                        />
                    </VStack>
                    {challenge.status === "success" ? (
                        <VStack spacing={"30px"}>
                            <MessageCheckModal isExpired={isExpired} />
                            <PiggyBankFinished isExpired={isExpired} />
                        </VStack>
                    ) : (
                        <></>
                    )}
                </Box>
            </VStack>
        </>
    );
}

export default LastChallengePage;
