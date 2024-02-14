import { useLocation, useParams } from "react-router-dom";
import TitleText from "components/TitleText";
import bgSucceedChallenge from "assets/images/bgSucceedChallenge.png";
import bgFailedChallenge from "assets/images/bgFailedChallenge.png";
import { Box, Heading, VStack, useBreakpointValue } from "@chakra-ui/react";
import MessageCheckModal from "../challenge-page/modal/completed-modal/message-check-modal/MessageCheckModal";
import PiggyBankFinished from "../challenge-page/modal/completed-modal/piggy-bank/PiggyBankFinished";
import StatusBar from "../challenge-page/status-bar/StatusBar";
import Strick from "../home-tab-page/strick/Strick";
import InfoCards from "../home-tab-page/info-cards/InfoCards";
import { useEffect } from "react";
import { getChallengeInfo } from "apis/api/Challenge";
import { useRecoilState, useResetRecoilState } from "recoil";
import { challengeCheerMessageList, challengeState } from "contexts/Challenge";
import { getCheerMessageList } from "apis/api/CheerMsg";

function LastChallengePage() {
    const { groupId, challengeId } = useParams();
    const location = useLocation();
    const challenge = location.state.challenge;
    const [currentChallenge, setCurrentChallenge] =
        useRecoilState(challengeState);
    const tabName =
        challenge.status === "SUCCESS" ? "성공한 챌린지" : "실패한 챌린지";
    const description =
        challenge.status === "SUCCESS"
            ? "이전에 성공한 챌린지 정보를 볼 수 있어요"
            : "이전에 실패한 챌린지 정보를 볼 수 있어요";
    const bgImage =
        challenge.status === "SUCCESS" ? bgSucceedChallenge : bgFailedChallenge;
    const isExpired = "True";
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [cheerMessageList, setCheerMessageList] = useRecoilState(
        challengeCheerMessageList
    );
    const resetCheerMessageListAtom = useResetRecoilState(
        challengeCheerMessageList
    );

    useEffect(() => {
        const fetchData = async () => {
            resetCheerMessageListAtom();
            try {
                const response = await getChallengeInfo(challengeId);
                const messageResponse = await getCheerMessageList(challengeId);
                setCheerMessageList(messageResponse);
                // console.log(messageResponse);
                const updatedChallenge = response.dto;
                setCurrentChallenge(updatedChallenge); // Recoil 상태에 데이터 적용
                // console.log(updatedChallenge);
                // console.log(cheerMessageList);
            } catch (error) {
                console.error("챌린지 정보 불러오기 실패", error);
            }
        };

        fetchData(); // fetchData 함수 호출
    }, [challengeId]);

    // console.log(challenge);

    const endDate = new Date(currentChallenge.endDate);
    const startedDate = new Date(currentChallenge.createdAt);
    const end = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate()
    );
    const start = new Date(
        startedDate.getFullYear(),
        startedDate.getMonth(),
        startedDate.getDate()
    );
    const diffMilliseconds = end - start;
    const diffDays = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000)) + 1;
    // console.log(currentChallenge);
    // console.log(endDate);
    // console.log(startedDate);
    // console.log(diffMilliseconds);
    // console.log(diffDays);

    return (
        <>
            <VStack marginBottom={15}>
                <StatusBar isExpired={isExpired} />
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
                    // width={"80vw"}
                    overflowY={"auto"}
                    height="50vh"
                    marginY={10}
                    // height="120vh"
                >
                    <VStack spacing={"30px"} mb={20}>
                        {currentChallenge.status === "SUCCESS" ? (
                            <Heading fontSize={isMobile ? "xl" : "xx-large"}>
                                {currentChallenge.userName}님이 성공했던 금연
                                기록이에요!
                            </Heading>
                        ) : (
                            <Heading fontSize={isMobile ? "xl" : "xx-large"}>
                                {currentChallenge.userName}님이 금연하려 했던
                                노력이에요
                            </Heading>
                        )}
                        <Box
                            display={"flex"}
                            flexWrap={"wrap"}
                            justifyContent={"center"}
                            sx={{ transform: isMobile ? "scale(0.5)" : "none" }}
                        >
                            <Strick
                                challenge={currentChallenge}
                                startedDate={startedDate}
                            />
                        </Box>
                        <Heading></Heading>
                        <InfoCards
                            diffDays={diffDays}
                            diffMilliseconds={diffMilliseconds}
                            challengeId={currentChallenge.challengeId}
                            isExpired={isExpired}
                        />
                    </VStack>
                    {challenge.status === "SUCCESS" ? (
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
