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
import { challengeState, challengeEndDate, challengeListState } from "../../../../../../contexts/Challenge";
import { currentGroupState } from "../../../../../../contexts/User";


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
          {/* onClick에 API 연결 => POST실행 후에 데이터 받아와서 그 값들을 하단 출력에 활용해서 넣어줄 것.  */}
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
                          onClick={
                              navigate(`/group/${currentGroup.groupId}`)
                          }
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