import { useLocation } from "react-router-dom";
import StatusBar from "./status-bar/StatusBar";
import HomeTab from "../group-tab/home-tab/HomeTab";

function LastChallenge() {
    const location = useLocation();
    const challenge = location.state.challenge;
    return (
        <>
            <StatusBar challenge={challenge} />
            <p>지난 챌린지</p>
            <HomeTab />
            {/* props 전달해줄 것, HomeTab도 로직 수정해야 함 */}
            <p>{challenge.username}</p>
        </>
    );
}

export default LastChallenge;
