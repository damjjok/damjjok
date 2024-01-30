import { useRecoilValue } from "recoil";
import { currentUserState } from "../../../context/user";
import { challengeState } from "../../../context/Challenge";
import BasicButton from "../../../../../components/button/BasicButton";

function StatusBar() {
    const currentUser = useRecoilValue(currentUserState);
    const currentChallenge = useRecoilValue(challengeState);
    let today = new Date();

    return (
        <div className=" flex justify-between items-center bg-damgray px-4">
            <div className="flex items-center">
                <p className=" text-lg font-bold">
                    {currentUser.userName} 챌린지 -
                    {currentChallenge.createdAt.toLocaleDateString()}
                </p>
                <div className=" bg-damblack rounded-xl max-h-4 px-2 mx-2 text-xs text-damyellow">
                    D-{today.getDate() - currentChallenge.createdAt.getDate()}
                </div>
                <p>{currentChallenge.determination}</p>
                <button>수정</button>
            </div>
            <div className="flex items-center">
                <BasicButton buttonName={"출석하기"} variant={"smbtn"} />
                <div>
                    <div>리워드</div>
                    <p>리워드 숫자</p>
                </div>
            </div>
        </div>
    );
}

export default StatusBar;
