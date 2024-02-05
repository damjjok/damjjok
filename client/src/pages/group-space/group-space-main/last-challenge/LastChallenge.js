import { useLocation } from "react-router-dom";
import StatusBar from "./status-bar/StatusBar";
import HomeTab from "../group-tab/home-tab/HomeTab";
// import PageIntroduction from "components/page-introduction/PageIntroduction";
import TitleText from "components/TitleText";
import bgSucceedChallenge from "assets/images/bgSucceedChallenge.png";

function LastChallenge() {
    const location = useLocation();
    const challenge = location.state.challenge;
    const tabName =
        challenge.status === "success" ? "성공한 챌린지" : "실패한 챌린지";
    const description =
        challenge.status === "success"
            ? "이전에 성공한 챌린지 정보를 볼 수 있어요"
            : "이전에 실패한 챌린지 정보를 볼 수 있어요";
    return (
        <>
            {/* <PageIntroduction tabName={tabName} /> */}
            <TitleText
                fontSize="2rem"
                img={bgSucceedChallenge}
                description={description}
            >
                {tabName}
            </TitleText>
            <StatusBar challenge={challenge} />
            <HomeTab challengeId={challenge.challengeId} />
            {/* props 전달해줄 것, HomeTab도 로직 수정해야 함 */}
            <p>{challenge.username}</p>
        </>
    );
}

export default LastChallenge;
