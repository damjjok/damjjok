import {
    Modal,
    ModalOverlay,
    ModalContent,
    // ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import BasicButton from "../../../components/button/BasicButton";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { createChallengeEndDate, createChallengeState } from "../../../contexts/Challenge";
import { useEffect } from "react";
import { createChallenge } from "apis/api/Challenge";

function ChallengeCreateModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const challenge = useRecoilValue(createChallengeState);
    const endDate = useRecoilValue(createChallengeEndDate);
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const data = await createChallenge({
                groupId: challenge.groupId,
                duration: challenge.duration,
                initialMoney: challenge.initialMoney,
                savedMoney: challenge.savedMoney,
                savedPeriod: challenge.savedPeriod,
            });
            onOpen();
        } catch (error) {
            console.log(challenge);
            console.error(error);
        }
    };

    return (
        <div>
            <BasicButton onClick={handleClick} buttonName={"생성하기"} />
            {/* onClick에 API 연결 => POST실행 후에 데이터 받아와서 그 값들을 하단 출력에 활용해서 넣어줄 것.  */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody className="mt-16 px-8">
                        <div className="mb-8">
                            <p className="text-2xl font-bold text-center">챌린지 생성 완료!</p>
                            <p className="text-center">챌린지가 아래와 같이 생성되었습니다.</p>
                            <p className="text-center">챌린지 성공을 기원합니다!</p>
                        </div>
                        <div className="flex justify-between">
                            <p>챌린지 종료일</p>
                            <p>{endDate.toLocaleDateString()}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>만료시 저금통 적립 금액</p>
                            <p>{challenge.initialMoney + challenge.savedMoney * (challenge.duration / challenge.savedPeriod)} 원</p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <BasicButton
                            className="flex justify-center"
                            onClick={() => navigate(`/group/${challenge.groupId}/`)}
                            buttonName={"챌린지 시작하기"}
                            variant={"bigbtn"}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default ChallengeCreateModal;
