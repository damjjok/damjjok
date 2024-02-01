import { useRecoilValue } from "recoil";
import BasicButton from "../../../../../components/button/BasicButton";
import { currentUserState } from "../../../../../contexts/User";
import { EditIcon } from "@chakra-ui/icons";
import candyImg from "assets/images/candylogo.png";
// import { challengeState } from "../../../../../contexts/Challenge";

function StatusBar() {
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
    }

    const startedDate = new Date(currentChallenge.createdAt);

    // 두 날짜 사이의 밀리초 차이를 계산합니다.
    const diffMilliseconds = today.getTime() - startedDate.getTime();
    const diffDays = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000));

    return (
        <div className=" flex justify-between items-center bg-damgray px-4">
            <div className="flex items-center">
                <p className=" text-lg font-bold">
                    {currentUser.userName} 챌린지 -
                    {/* {currentChallenge.createdAt.toLocaleDateString()} */}
                </p>
                <div className=" bg-damblack rounded-xl max-h-4 px-2 mx-2 text-xs text-damyellow">
                    D+{diffDays}
                </div>
                <p>{currentChallenge.determination}</p>
                <EditIcon />
            </div>
            <div className="flex items-center">
                <BasicButton buttonName={"출석하기"} variant={"smbtn"} />
                <div className="flex flex-col items-center">
                    <div className="bg-damwhite rounded-full border border-damyellow">
                        <img
                            src={candyImg}
                            alt="candyImg"
                            className="w-[25px] h-[25px]"
                        />
                    </div>
                    <p className=" text-xs">응원 숫자</p>
                </div>
            </div>
        </div>
    );
}

export default StatusBar;
