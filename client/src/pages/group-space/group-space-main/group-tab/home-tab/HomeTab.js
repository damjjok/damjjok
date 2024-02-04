import { useRecoilValue } from "recoil";
import Strick from "./strick/Strick";
import { challengeState } from "../../../../../contexts/Challenge";
import { currentUserState } from "../../../../../contexts/User";
import InfoCards from "./info-cards/InfoCards";

function HomeTab() {
    const currentUser = useRecoilValue(currentUserState);
    let currentChallenge = localStorage.getItem("challengeList");
    let today = new Date();
    if (currentChallenge) {
        // 가져온 값이 있으면 JSON.parse를 사용해서 문자열을 객체로 변환합니다.
        const myChallenge = JSON.parse(currentChallenge);

        // 이후 myObject를 원하는대로 사용할 수 있습니다.
        currentChallenge = myChallenge[0];
    } else {
        console.log("No data in localStorage");
        return (<></>)
    }

    const startedDate = new Date(currentChallenge.createdAt);

    // 두 날짜 사이의 밀리초 차이를 계산합니다.
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
