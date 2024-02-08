// import NormalButton from "../../../components/button/normalbutton";
import {
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
import ChallengeCreateAlert from "./challenge-create-modal/ChallengeCreateAlert";
import TitleText from "components/TitleText";
import { useParams } from "react-router-dom";

function CreateChallenge() {
    const { groupId } = useParams();
    const { isOpen, onClose } = useDisclosure();
    // const [challenge, setChallenge] = useRecoilState(challengeState);

    // const endDate = useRecoilValue(challengeEndDate);

    return (
        <div>
            <TitleText
                className="mt-4"
                fontSize="2rem"
                img={bgCreateChallenge}
                description="새로운 금연 챌린지를 생성해보세요!"
            >
                챌린지 생성하기
            </TitleText>
            <Flex flexFlow={"column"} alignItems={"center"}>
                <VStack>
                    <ChallengeDuration />
                    <ChallengeMoney />
                </VStack>
                <ChallengeCreateAlert isOpen={isOpen} onClose={onClose} />
            </Flex>
        </div>
    );
}

export default CreateChallenge;
