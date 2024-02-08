import { isVotedState } from "contexts/TruthRoomSocket";
import { useRecoilValue } from "recoil";
import SmallFrameComponent from "../../small-frame/SmallFrameComponent";
import VoteWaitComponent from "./VoteWaitComponent";
import DoVoteComponent from "./DoVoteComponent";

function VoteFrame(props) {
    const isVoted = useRecoilValue(isVotedState);
    console.log("isVoted 상태: " + isVoted);
    const testUser = {
        name: "김영후",
        role: "phD",
    };

    if (testUser.role === "damJJok" || isVoted) {
        // 담쪽이인 경우 or 투표를 한 경우 => 대기 화면
        return (
            <SmallFrameComponent
                width={752}
                height={318}
                content={<VoteWaitComponent />}
            ></SmallFrameComponent>
        );
    } else {
        // 투표를 하지 않은 경우 => 투표 화면
        return (
            <SmallFrameComponent
                width={752}
                height={318}
                content={<DoVoteComponent />}
            ></SmallFrameComponent>
        );
    }
}

export default VoteFrame;
