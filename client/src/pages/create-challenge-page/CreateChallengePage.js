// import NormalButton from "../../../components/button/normalbutton";
import {
    Box,
    Flex,
    Text,
    VStack,
    useBreakpointValue,
    useDisclosure,
} from "@chakra-ui/react";
import bgCreateChallenge from "assets/images/bgCreateChallenge.jpg";

// import { useRecoilState, useRecoilValue } from "recoil";
// import { challengeState } from "../../../context/Challenge";
// import { challengeEndDate } from "../../../context/ChallengeSelectors";
import ChallengeDuration from "./challenge-duration/ChallengeDuration";
import ChallengeMoney from "./challenge-money/ChallengeMoney";
// import ChallengeCreateModal from "./challenge-create-modal/ChallengeCreateModal";
import ChallengeCreateAlert from "./modal/ChallengeCreateAlert";
import TitleText from "components/TitleText";
import { useParams } from "react-router-dom";
import { createChallengeState } from "contexts/Challenge";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { currentUserState } from "contexts/User";

function CreateChallengePage() {
    const { groupId } = useParams();
    const groupIdval = Number(groupId);
    const { isOpen, onClose } = useDisclosure();
    const currentUser = useRecoilValue(currentUserState);
    const [challenge, setChallenge] = useRecoilState(createChallengeState);
    const isMobile = useBreakpointValue({ base: true, md: false });
    const initialState = {
        groupId: groupIdval,
        duration: 0,
        initialMoney: 0,
        savedPeriod: 0,
        savedMoney: 0,
    };

    useEffect(() => {
        // 상태 초기화
        setChallenge(initialState);
    }, []);

    // useEffect(() => {
    //     console.log("createChallengeState has changed:", challenge);
    // }, [challenge]);
    // const endDate = useRecoilValue(challengeEndDate);

    return (
        <Box>
            <TitleText
                // className="mt-4"
                fontSize="2rem"
                img={bgCreateChallenge}
                description="새로운 금연 챌린지를 생성해보세요!"
            >
                챌린지 생성하기
            </TitleText>
            <Flex
                flexFlow={"column"}
                my={6}
                overflowY={"auto"}
                height={isMobile ? "68vh" : "64vh"}
                // width={isMobile ? "90vw" : "none"}
            >
                <Text fontSize={"x-large"} fontWeight={700}>
                    챌린지 기한 설정
                </Text>
                <Box
                    display={"flex"}
                    flexFlow={"column"}
                    alignItems={"center"}
                    mt={8}
                    mb={12}
                >
                    <ChallengeDuration />
                </Box>
                <Text fontSize={"x-large"} fontWeight={700}>
                    금연 저금통 설정
                </Text>
                <Box
                    display={"flex"}
                    flexFlow={"column"}
                    alignItems={"center"}
                    mt={8}
                    mb={12}
                >
                    <ChallengeMoney />
                </Box>
                {/* <Text>
                        {groupId},{currentUser.userId},{challenge.duration},
                        {challenge.savedMoney},{challenge.initialMoney},
                        {challenge.savedPeriod}
                    </Text> */}
                <Box
                    display={"flex"}
                    flexFlow={"column"}
                    alignItems={"center"}
                    mb={4}
                >
                    <ChallengeCreateAlert isOpen={isOpen} onClose={onClose} />
                </Box>
            </Flex>
        </Box>
    );
}

export default CreateChallengePage;
