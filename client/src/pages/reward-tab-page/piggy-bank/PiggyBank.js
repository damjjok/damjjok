// import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import piggybanklogo from "assets/images/piggybanklogo.png";
import { challengeState } from "contexts/Challenge";
import { useRecoilValue } from "recoil";
// import { challengeState } from "contexts/Challenge";
// import { useRecoilValue } from "recoil";
// import { css } from "twin.macro";

function PiggyBank(progress = 0.2) {
    const processPercentage = progress * 100;
    const currentChallenge = useRecoilValue(challengeState);
    let today = new Date();

    const startedDate = new Date(currentChallenge.createdAt);
    // 두 날짜 사이의 밀리초 차이를 계산합니다.
    const diffMilliseconds = today.getTime() - startedDate.getTime();
    const diffDays = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000));

    return (
        <div className="relative flex justify-center my-8">
            <div style={{ width: "300px" }}>
                <img
                    src={piggybanklogo}
                    alt="Piggybank Background"
                    style={{ width: `${processPercentage}%` }}
                />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-fit text-center py-4">
                <p className=" font-bold">
                    누적 금액 :{" "}
                    {currentChallenge.initialMoney +
                        currentChallenge.savedMoney *
                            Math.floor(
                                diffDays / currentChallenge.savedPeriod,
                            )}{" "}
                    원
                </p>
            </div>
        </div>
    );
}

// 도전과제 : PiggyBank 퍼센테이지에 따라 차오르도록 만들기
// function PiggyBank({ progress = 1 }) {
//     const overlayStyle = {
//         position: "absolute",
//         bottom: "0",
//         left: "0",
//         width: "35vw",
//         height: `25vw`,
//         objectFit: "contain",
//     };

//     return (
//         <div style={{ position: "relative", width: "200px", height: "200px" }}>
//             <img
//                 src={piggybanklogo}
//                 alt="Piggybank Background"
//                 style={{
//                     position: "absolute",
//                     left: "0",
//                     width: "35vw",
//                     height: "25vw",
//                     objectFit: "contain",
//                     opacity: "0.5",
//                 }}
//             />
//             <img
//                 src={piggybanklogo}
//                 alt="Piggybank percentage"
//                 style={overlayStyle}
//             ></img>
//         </div>
//     );
// }

export default PiggyBank;
