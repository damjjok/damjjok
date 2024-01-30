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
import BasicButton from "../../../../../../components/button/BasicButton";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { challengeState } from "../../../../context/Challenge";
import { challengeEndDate } from "../../../../context/ChallengeSelectors";
import { challengeListState } from "../../../../context/Challenge";
import { currentGroupState } from "../../../../context/user";

function saveChallengeListToLocalStorage(challengeList) {
  localStorage.setItem("challengeList", JSON.stringify(challengeList));
}

// 로컬 스토리지 내 챌린지 리스트 불러오는 함수인데, 일단 여기서 안 써서 주석처리
// function loadChallengeListFromLocalStorage() {
//   const storedChallengeList = localStorage.getItem("challengeList");
//   return storedChallengeList ? JSON.parse(storedChallengeList) : [];
// }

function ChallengeCreateModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [challenge, setChallenge] = useRecoilState(challengeState);
  const [challengeList, setChallengeList] =
      useRecoilState(challengeListState);
  const endDate = useRecoilValue(challengeEndDate);
  const navigate = useNavigate();
  const currentGroup = useRecoilValue(currentGroupState);
  return (
      <div>
          <BasicButton onClick={onOpen} buttonName={"생성하기"} />
          <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                  <ModalCloseButton />
                  <ModalBody className="mt-16 px-8">
                      <div className="mb-8">
                          <p className="text-2xl font-bold text-center">
                              챌린지 생성 완료!
                          </p>
                          <p className="text-center">
                              챌린지가 아래와 같이 생성되었습니다.
                          </p>
                          <p className="text-center">
                              챌린지 성공을 기원합니다!
                          </p>
                      </div>
                      <div className="flex justify-between">
                          <p>챌린지 종료일</p>
                          <p>{endDate.toLocaleDateString()}</p>
                      </div>
                      <div className="flex justify-between">
                          <p>예상 저금통 금액</p>
                          <p>
                              {challenge.initialMoney +
                                  challenge.savedMoney *
                                      (challenge.duration /
                                          challenge.savedPeriod)}
                          </p>
                      </div>
                  </ModalBody>
                  <ModalFooter>
                      <BasicButton
                          className="flex justify-center"
                          onClick={() => {
                              const newChallengeList = [
                                  ...challengeList,
                                  challenge,
                              ];
                              setChallengeList(newChallengeList);
                              saveChallengeListToLocalStorage(
                                  newChallengeList,
                              );
                              navigate(`/group/${currentGroup.groupId}`);
                          }}
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