import { useLocation } from "react-router-dom";

function LastChallenge() {
    const location = useLocation();
    const challenge = location.state.challenge;
    return (
        <>
            <p>지난 챌린지</p>
            <p>{challenge.username}</p>
        </>
    );
}

export default LastChallenge;
