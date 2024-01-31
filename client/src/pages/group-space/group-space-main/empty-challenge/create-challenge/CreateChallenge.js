// import NormalButton from "../../../components/button/normalbutton";
import { useDisclosure } from "@chakra-ui/react";

// import { useRecoilState, useRecoilValue } from "recoil";
// import { challengeState } from "../../../context/Challenge";
// import { challengeEndDate } from "../../../context/ChallengeSelectors";
import ChallengeDuration from "./challenge-duration/ChallengeDuration";
import ChallengeMoney from "./challenge-money/ChallengeMoney";
// import ChallengeCreateModal from "./challenge-create-modal/ChallengeCreateModal";
import ChallengeCreateAlert from "./challenge-create-modal/ChallengeCreateAlert";

function CreateChallenge() {
    const { isOpen, onClose } = useDisclosure();
    // const [challenge, setChallenge] = useRecoilState(challengeState);

    // const endDate = useRecoilValue(challengeEndDate);

    return (
        <div className="pb-16 ">
            <p className="text-xl font-bold">챌린지 생성하기</p>
            <div className="flex flex-col items-center">
                <ChallengeDuration />
                <ChallengeMoney />
                <ChallengeCreateAlert isOpen={isOpen} onClose={onClose} />

            </div>
        </div>
    );
}

export default CreateChallenge;
