import { useLocation } from "react-router-dom";
import StatusBar from "./status-bar/StatusBar";

function LastChallenge() {
    const location = useLocation();
    const challenge = location.state.challenge;
    return (
        <>
            <StatusBar challenge={challenge} />
            <p>지난 챌린지</p>
            <p>{challenge.username}</p>
        </>
    );
}

export default LastChallenge;
