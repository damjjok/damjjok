import { useRecoilValue } from "recoil";
import Strick from "./strick/Strick";
import { challengeState } from "../../../../../contexts/Challenge";
import { currentUserState } from "../../../../../contexts/User";
function HomeTab() {
    const challenge = useRecoilValue(challengeState);
    const currentUser = useRecoilValue(currentUserState);
    let today = new Date();

    return (
        <div>
            <div>
                <p className="text-xl font-bold">
                    {currentUser.userName}님! 오늘은 금연{" "}
                    {today.getDate() - challenge.createdAt.getDate()}
                    일차예요!
                </p>
                <Strick />
                <p>
                    금연 시작일 : {challenge.createdAt.toLocaleDateString()} |
                    목표일 수 : {challenge.duration}일
                </p>
            </div>
            <div className="py-8">
                <p className="text-xl font-bold">
                    오늘의 {currentUser.userName}님은...
                </p>
                <div className="flex">
                    <div className=" border-4 rounded-xl border-yellow-400 min-w-lg py-20 mx-4">
                        <p>이미지</p>
                        <p className="text-sm font-semibold">
                            하루 1값 기준 4500원을 아꼈어요!
                        </p>
                    </div>
                    <div className=" border-4 rounded-xl border-yellow-400 py-20 mx-4">
                        <p>이미지</p>
                        <p className="text-sm font-semibold">
                            전체 챌린저 중 상위 n%에요!
                        </p>
                    </div>
                    <div className=" border-4 rounded-xl border-yellow-400 py-20 mx-4">
                        <p>이미지</p>
                        <p className="text-sm font-semibold">
                            금연 전보다 ㅇㅇ이 n% 좋아졌어요!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeTab;
