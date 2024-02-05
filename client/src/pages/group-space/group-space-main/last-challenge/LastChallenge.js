import { useLocation } from "react-router-dom";
import HomeTab from "../group-tab/home-tab/HomeTab";
import TitleText from "components/TitleText";
import bgSucceedChallenge from "assets/images/bgSucceedChallenge.png";
import bgFailedChallenge from "assets/images/bgFailedChallenge.png";
import { Box, VStack } from "@chakra-ui/react";
import MessageCheckModal from "../group-tab/completed-modal/message-check-modal/MessageCheckModal";
import PiggyBankFinished from "../group-tab/completed-modal/piggy-bank/PiggyBankFinished";
import StatusBar from "../group-tab/status-bar/StatusBar";

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

    return (
        <>
            <VStack marginBottom={15} >
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
                    minheight="50vh"
                    marginY={10}
                    // height="120vh"
                >
                    <HomeTab challengeId={challenge.challengeId} />
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
