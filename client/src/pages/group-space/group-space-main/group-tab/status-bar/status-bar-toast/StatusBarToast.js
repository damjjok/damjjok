import { useToast } from "@chakra-ui/react";
import BasicButton from "components/button/BasicButton";
import { currentUserState } from "contexts/User";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

function StatusBarToast() {
    const [isClicked, setIsClicked] = useState(false); // 버튼 클릭 여부 확인
    const toast = useToast();
    const currentUser = useRecoilValue(currentUserState);

    // 버튼이 클릭되면, 클릭 감지하는 함수
    const handleButtonClick = () => {
        setIsClicked(true);
        if (currentUser.role === "damJJok") {
            toast({
                title: "출석 완료!",
                description: "오늘의 금연도 화이팅이에요!",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            // 출석일수 추가해주는 로직 넣어줘야 함
        } else {
            toast({
                title: "응원 완료!",
                description: `담쪽이 님을 응원했어요!`,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            // 사탕 추가해주는 로직 넣어줘야 함
        }
    };

    useEffect(() => {
        // 자정에 상태를 초기화하는 함수를 실행하는 타이머를 설정합니다.
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const timeUntilTomorrow = tomorrow - now;

        const timerId = setTimeout(() => setIsClicked(false), timeUntilTomorrow);

        return () => clearTimeout(timerId); // 컴포넌트가 언마운트되면 타이머를 취소합니다.
    }, [isClicked]); // 상태가 변경될 때마다 타이머를 재설정합니다.

    return <BasicButton onClick={handleButtonClick} isDisabled={isClicked} buttonName={currentUser.role === "damJJok" ? "출석하기" : "응원하기"}></BasicButton>;
}

export default StatusBarToast;
