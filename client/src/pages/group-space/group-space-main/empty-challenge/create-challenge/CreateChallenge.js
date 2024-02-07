// import NormalButton from "../../../components/button/normalbutton";
import { Text, useDisclosure } from "@chakra-ui/react";

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
    const { groupId } = useParams()
    const { isOpen, onClose } = useDisclosure();
    // const [challenge, setChallenge] = useRecoilState(challengeState);

    // const endDate = useRecoilValue(challengeEndDate);

    return (
        <div>
            <TitleText className="mt-4" fontSize="3rem">
                챌린지 생성하기
            </TitleText>
            <div className="flex flex-col items-center">
                <ChallengeDuration />
                <ChallengeMoney />
                <ChallengeCreateAlert isOpen={isOpen} onClose={onClose} />
            </div>
        </div>
    );
}

export default CreateChallenge;
