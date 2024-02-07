import { useLocation } from "react-router-dom";
import HomeTab from "../group-tab/home-tab/HomeTab";
import TitleText from "components/TitleText";
import bgSucceedChallenge from "assets/images/bgSucceedChallenge.png";
import bgFailedChallenge from "assets/images/bgFailedChallenge.png";
import { Box, Heading, VStack } from "@chakra-ui/react";
import MessageCheckModal from "../group-tab/completed-modal/message-check-modal/MessageCheckModal";
import PiggyBankFinished from "../group-tab/completed-modal/piggy-bank/PiggyBankFinished";
import StatusBar from "../group-tab/status-bar/StatusBar";
import Strick from "../group-tab/home-tab/strick/Strick";
import InfoCards from "../group-tab/home-tab/info-cards/InfoCards";

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
    const isExpired = "True";

    //더미
    const startedDate = new Date(challenge.createdAt);

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
                                {challenge.username}님이 성공했던 금연
                                기록이에요!
                            </Heading>
                        ) : (
                            <Heading>
                                {challenge.username}님이 금연하려 했던 노력은...
                            </Heading>
                        )}
                        <Strick startedDate={startedDate} />
                        <Heading></Heading>
                        <InfoCards />
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

export default LastChallenge;
