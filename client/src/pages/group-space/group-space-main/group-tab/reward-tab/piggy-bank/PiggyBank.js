// import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import piggybanklogo from "assets/images/piggybanklogo.png";
// import { css } from "twin.macro";

function PiggyBank(progress = 0.4) {
    const processPercentage = progress * 100;

    return (
        <div>
            <h1>금연 저금통</h1>
            <div style={{ width: "500px" }}>
                <img
                    src={piggybanklogo}
                    alt="Piggybank Background"
                    style={{ width: `${processPercentage}%` }}
                />
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
