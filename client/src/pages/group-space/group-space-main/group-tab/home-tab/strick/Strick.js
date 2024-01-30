import { useRecoilValue } from "recoil";
import { challengeState } from "../../../../context/Challenge";

function Strick() {
    const currentChallenge = useRecoilValue(challengeState);
    const due = currentChallenge.duration;
    // 반복문 어떻게 돌려야할지?
    // duration 범위 잡고, 5씩 세로 / 나머지 가로 이중리스트
    // div, div?
    return <div>스트릭</div>;
}

export default Strick;
