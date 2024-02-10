import BasicButton from "components/button/BasicButton";
import Strick from "../../../../home-tab-page/strick/Strick";
import InfoCards from "../../../../home-tab-page/info-cards/InfoCards";
import {
    Box,
    Flex,
    ModalBody,
    Text,
    VStack,
    useBreakpointValue,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import trophyIcon from "assets/gifs/trophy.gif";
import { useRecoilValue } from "recoil";
import { challengeState } from "contexts/Challenge";

function ChallengeReport({ nextContent }) {
    const currentChallenge = useRecoilValue(challengeState);
    const isMobile = useBreakpointValue({ base: true, md: false });
    let today = new Date();
    const startedDate = new Date(currentChallenge.createdAt);
    // 두 날짜 사이의 밀리초 차이를 계산
    const diffMilliseconds = today.getTime() - startedDate.getTime();
    const diffDays = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000));
    return (
        <>
            <Flex
                flexFlow={"column"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <VStack
                    flexFlow={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    {/* <StarIcon marginY={4} boxSize={20} color='dam.yellow'/> */}
                    <img
                        src={trophyIcon}
                        alt="trophyIcon"
                        style={{
                            clipPath: "circle(50%)",
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                        }}
                    />
                    <p className=" font-extrabold text-4xl text-center">
                        축하해요!
                    </p>
                    <p className=" font-extrabold text-4xl text-center">
                        앞으로도 금연을 이어나가요!
                    </p>
                    <Flex flexFlow={"column"} marginY={10}>
                        <Text
                            fontSize={"xl"}
                            fontWeight={"semibold"}
                            textAlign={"center"}
                        >
                            180일 챌린지에 성공했어요!
                        </Text>
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
                    </Flex>
                    <Box marginY={10}>
                        <InfoCards
                            diffDays={diffDays}
                            diffMilliseconds={diffMilliseconds}
                            challengeId={currentChallenge.challengeId}
                        />
                    </Box>
                </VStack>
                <BasicButton
                    buttonName={"다음으로"}
                    variant={"bigbtn"}
                    onClick={nextContent}
                />
            </Flex>
        </>
    );
}

export default ChallengeReport;
