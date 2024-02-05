import { Flex, ModalBody } from "@chakra-ui/react";
import BasicButton from "components/button/BasicButton";
import PiggyBank from "../../reward-tab/piggy-bank/PiggyBank";
import { useNavigate } from "react-router-dom";

function PiggyBankFinished({ nextContent }) {
    const navigate = useNavigate();
    return (
        <>
            <Flex
                flexFlow={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                marginY={20}
            >
                {/* <StarIcon boxSize={20} color='dam.yellow'/> */}
                <p className=" font-extrabold text-4xl text-center">
                    금연 저금통에 이만큼 쌓였어요!
                </p>
                <PiggyBank />
                <BasicButton
                    buttonName={"챌린지 종료하기"}
                    variant={"bigbtn"}
                    onClick={() => navigate("empty-challenge")}
                />
                {/* onClick에 현재 챌린지 -> 종료된 챌린지 리스트로 보내는 로직도 넣어야 할 듯 */}
            </Flex>
        </>
    );
}

export default PiggyBankFinished;
