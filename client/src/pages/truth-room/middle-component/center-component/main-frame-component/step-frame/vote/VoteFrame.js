import { stepState } from "contexts/TruthRoom";
import { useRecoilState } from "recoil";

function VoteFrame(props) {
    const [step, setStep] = useRecoilState(stepState);

    return <div></div>;
}

export default VoteFrame;
