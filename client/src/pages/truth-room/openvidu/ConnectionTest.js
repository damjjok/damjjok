import { Button } from "@chakra-ui/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    challengeIdState,
    enteringTruthRoomMemberInfoState,
} from "contexts/TruthRoomSocket";
import { useNavigate, useParams } from "react-router-dom";

const ConnectionTest = () => {
    const navigate = useNavigate();
    const [enteringTruthRoomMemberInfo, setEnteringTruthRoomMemberInfo] =
        useRecoilState(enteringTruthRoomMemberInfoState);
    const setChallengeId = useSetRecoilState(challengeIdState);

    const { challengeId } = useParams(); // 테스트를 위한 challengeId 받아오기(구조 분해 할당)
    const hoo = {
        name: "김영후",
        role: "Damjjok",
    };
    const phD = {
        name: "박사님" + (Math.floor(Math.random() * 10) + 1),
        role: "phD",
    };

    function handleClickEnterDamjjok() {
        // 담쪽이가 입장함을 테스트
        setChallengeId(challengeId);
        setEnteringTruthRoomMemberInfo(hoo);
        navigate(`/truth-room/1/challenge/${challengeId}`);
    }

    function handleClickEnterPhD() {
        // 박사님이 입장함을 테스트
        setChallengeId(challengeId);
        setEnteringTruthRoomMemberInfo(phD);
        navigate(`/truth-room/1/challenge/${challengeId}`);
    }

    return (
        <div>
            <div>
                <Button onClick={() => handleClickEnterDamjjok()}>
                    담쪽이 입장하기
                </Button>
                <Button onClick={() => handleClickEnterPhD()}>
                    박사님 입장하기
                </Button>
            </div>
        </div>
    );
};

export default ConnectionTest;
