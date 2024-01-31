// import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

function PiggyBank() {
    return (
        <div>
            <h1>금연저금통!</h1>
            <img
                src="../../../../../assets/images/piggybanklogo.png"
                alt="piggybank"
            />
            {/* <CircularProgress
                value={70} // 초기 적립금, 현재 적립금, 예상 적립금 퍼센테이지 계산해서 백분율로 변환해야 함.
                color="dam.yellow" // 후에 컬러 시스템 잡아야 함
                size="250px"
                thickness="15px" // thick 15 이상이면 크기에 걸림.
            >
                <CircularProgressLabel>
                    <p></p>
                    <h1>30000원</h1>
                </CircularProgressLabel>
            </CircularProgress> */}
        </div>
    );
}

export default PiggyBank;
