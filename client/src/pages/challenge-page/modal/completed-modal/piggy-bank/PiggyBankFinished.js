import { Flex, Heading, ModalBody, useBreakpointValue } from "@chakra-ui/react";
import BasicButton from "components/button/BasicButton";
import PiggyBank from "../../../../reward-tab-page/piggy-bank/PiggyBank";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { challengeState } from "contexts/Challenge";
import { completeChallenge } from "apis/api/Challenge";

function PiggyBankFinished({ nextContent, isExpired }) {
    const challenge = useRecoilValue(challengeState);
    const navigate = useNavigate();
    const isMobile = useBreakpointValue({ base: true, md: false });

    const handleGroupClick = (groupId) => {
        completeChallenge(challenge.challengeId);
        navigate(`/group/${groupId}/`); // 해당 그룹 ID의 경로로 이동
    };
    return (
        <>
            <Flex flexFlow={"column"} justifyContent={"center"} alignItems={"center"} marginY={20}>
                {/* <StarIcon boxSize={20} color='dam.yellow'/> */}
                <Heading fontSize={isMobile ? "xl" : "xx-large"}>
                    금연 저금통에 이만큼 쌓였어요!
                </Heading>
                <PiggyBank />
                {!isExpired ? <BasicButton buttonName={"챌린지 종료하기"} variant={"bigbtn"} onClick={() => handleGroupClick(challenge.groupId)} /> : <></>}

                {/* onClick에 현재 챌린지 -> 종료된 챌린지 리스트로 보내는 로직도 넣어야 할 듯 */}
            </Flex>
        </>
    );
}

export default PiggyBankFinished;
