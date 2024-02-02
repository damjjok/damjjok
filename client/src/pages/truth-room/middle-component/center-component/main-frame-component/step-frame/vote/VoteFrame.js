import { stepState } from "contexts/TruthRoom";
import { useRecoilState } from "recoil";
import SmallFrameComponent from "../../small-frame/SmallFrameComponent";

function VoteFrame(props) {
    const [step, setStep] = useRecoilState(stepState);

    return <SmallFrameComponent></SmallFrameComponent>;
}

export default VoteFrame;
