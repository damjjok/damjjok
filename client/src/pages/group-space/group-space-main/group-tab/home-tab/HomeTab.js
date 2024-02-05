import { useRecoilValue } from "recoil";
import Strick from "./strick/Strick";
import { challengeState } from "../../../../../contexts/Challenge";
import { currentUserState } from "../../../../../contexts/User";
import InfoCards from "./info-cards/InfoCards";

function HomeTab({ challengeId }) {
    // axios = challengeId 기반으로 challenge 불러오기. (수정해야 함)
    let currentChallenge = localStorage.getItem("challengeList");

    // recoil = 로그인할 때 불러온 currentUser 사용하기
    const currentUser = useRecoilValue(currentUserState);
    let today = new Date();
    if (currentChallenge) {
        // 가져온 값이 있으면 JSON.parse를 사용해서 문자열을 객체로 변환
        const myChallenge = JSON.parse(currentChallenge);

        // 이후 myObject를 원하는대로 사용
        currentChallenge = myChallenge[0];
    } else {
        console.log("No data in localStorage");
        return <></>;
    }

    const startedDate = new Date(currentChallenge.createdAt);

    // 두 날짜 사이의 밀리초 차이를 계산
    const diffMilliseconds = today.getTime() - startedDate.getTime();
    const diffDays = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000));

    return (
        <div className="flex flex-col flex-wrap max-w-7xl">
            <div>
                <p className="text-xl font-bold">
                    {currentUser.userName}님! 오늘은 금연 {diffDays}
                    일차예요!
                </p>
                <div className="flex flex-wrap justify-center">
                    <Strick startedDate={startedDate} />
                </div>
            </div>
            <div className="py-8">
                <p className="text-xl font-bold">
                    오늘의 {currentUser.userName}님은...
                </p>
                <div className="flex flex-wrap my-4 justify-center">
                    <InfoCards />
                </div>
            </div>
        </div>
    );
}

export default HomeTab;
