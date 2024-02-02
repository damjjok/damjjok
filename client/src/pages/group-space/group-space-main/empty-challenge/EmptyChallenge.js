import { Link, useLocation } from "react-router-dom";

function EmptyChallenge() {
    const location = useLocation();

    return (
        <div>
            활성화된 챌린지가 없습니다.
            <Link to={`${location.pathname}createChallenge`}>
                <div className=" max-w-32 py-8 bg-yellow-400">
                    <p>새 챌린지 만들기</p>
                </div>
            </Link>
        </div>
    );
}

export default EmptyChallenge;
