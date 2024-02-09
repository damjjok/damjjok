import BasicButton from "components/button/BasicButton";
import Strick from "../../../../home-tab-page/strick/Strick";
import InfoCards from "../../../../home-tab-page/info-cards/InfoCards";
import { Box, Flex, ModalBody, Text, VStack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import trophyIcon from "assets/gifs/trophy.gif";

function ChallengeReport({ nextContent }) {
    let currentChallenge = localStorage.getItem("challengeList");
    if (currentChallenge) {
        // 가져온 값이 있으면 JSON.parse를 사용해서 문자열을 객체로 변환합니다.
        const myChallenge = JSON.parse(currentChallenge);

        // 이후 myObject를 원하는대로 사용할 수 있습니다.
        currentChallenge = myChallenge[0];
    } else {
        console.log("No data in localStorage");
        return <></>;
    }

    const startedDate = new Date(currentChallenge.createdAt);
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
                        <Text fontSize={"xl"} fontWeight={"semibold"}>
                            180일 챌린지에 성공했어요!
                        </Text>
                        <Strick startedDate={startedDate} />
                    </Flex>
                    <Box marginY={10}>
                        <InfoCards />
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
