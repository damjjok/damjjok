import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";
import { challengeState } from "contexts/Challenge";
import { enteringTruthRoomMemberInfoState } from "contexts/TruthRoomSocket";
import { currentUser } from "contexts/User";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const TruthRoomEnterModal = ({ isOpen, onClose, groupId, challengeId }) => {
    const setEnteringTruthRoomMemberInfo = useSetRecoilState(
        enteringTruthRoomMemberInfoState, // 소켓에서 활용 될 유저의 정보( {이름, 역할} )
    );
    const currentUserFromAccessToken = useRecoilValue(currentUser); // access token을 통해 받아온 유저 정보, 이곳에서 userName, userId 사용
    const challengeInfo = useRecoilValue(challengeState); // recoil을 통해 저장된 챌린지 정보(담쪽이의 userId 판별 용)

    useEffect(() => {
        var tempEnteringUser = { name: "", role: "" }; // role -> Damjjok or phD
        tempEnteringUser.name = currentUserFromAccessToken.userName;
        if (currentUserFromAccessToken.userId === challengeInfo.userId)
            tempEnteringUser.role = "Damjjok";
        // access token을 통해 받아온 userId가 현재 챌린지에 저장된 userId와 같으면 담쪽이
        else tempEnteringUser.role = "phD"; // 아니면 박사님
        setEnteringTruthRoomMemberInfo(tempEnteringUser); // 방 입장한 user 저장하는 recoil 값에 유저 정보 set
    }, [challengeInfo]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody textAlign={"center"}>
                    <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        height={"15vh"}
                    >
                        <Text fontSize={"1.3rem"} fontWeight={600}>
                            진실의 방에 입장하시겠습니까?
                        </Text>
                    </Flex>
                </ModalBody>

                <Flex justifyContent={"center"}>
                    <Button bg={"dam.yellow"} onClick={onClose} margin={"5%"}>
                        <Link
                            to={`/truth-room/${groupId}/challenge/${challengeId}`}
                        >
                            입장하기
                        </Link>
                    </Button>
                    <Button bg={"dam.gray"} margin={"5%"} onClick={onClose}>
                        취소
                    </Button>
                </Flex>
            </ModalContent>
        </Modal>
    );
};

export default TruthRoomEnterModal;
