import {
    CheckCircleIcon,
    NotAllowedIcon,
    PlusSquareIcon,
    RepeatClockIcon,
    WarningIcon,
} from "@chakra-ui/icons";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Flex,
    Circle,
    Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import challengeIcon from "assets/images/currentChallengeIcon.png";
import { useNavigate, useParams } from "react-router-dom";
import { getChallengeList } from "apis/api/Challenge";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currentUser, currentUserState } from "contexts/User";
import { challengeListState } from "contexts/Challenge";
// import { useRecoilValue } from "recoil";
// import { challengeListState } from "../../../../context/Challenge";

function ChallengeList({ onClick }) {
    const loginedUser = useRecoilValue(currentUser);
    const navigate = useNavigate();

    const { groupId } = useParams();
    // const setChallengeState = useSetRecoilState(challengeState);
    const [currentChallengeList, setCurrentChallengeList] =
        useRecoilState(challengeListState);
    const [currentGroupChallengeList, setCurrentGroupChallengeList] = useState(
        []
    );
    const [lastChallenge, setLastChallenge] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getChallengeList(groupId);
                const updatedChallengeList = response.list;

                setCurrentChallengeList(updatedChallengeList); // currentChallengeList 업데이트

                // 반복문을 돌면서 각 요소의 status에 따라 currentGroupChallengeList와 lastChallenge 배열에 추가
                // const updatedCurrentGroupChallengeList = [];
                // const updatedLastChallenge = [];
                // // if (!updatedCurrentGroupChallengeList.length) {
                // //     navigate(`./empty-challenge`);
                // // }

                // for (let i = 0; i < updatedChallengeList.length; i++) {
                //     const challenge = updatedChallengeList[i];
                //     if (challenge.status === "PROGRESS") {
                //         updatedCurrentGroupChallengeList.push(challenge);
                //     } else {
                //         updatedLastChallenge.push(challenge);
                //     }
                // }
                // if (updatedCurrentGroupChallengeList.length == 0) {
                //     navigate(`./empty-challenge`);
                // } else {
                //     navigate(
                //         `./challenge/${updatedCurrentGroupChallengeList[0].challengeId}`
                //     );
                // }

                // setCurrentGroupChallengeList(updatedCurrentGroupChallengeList);
                // setLastChallenge(updatedLastChallenge);
            } catch (error) {
                console.error("챌린지 정보 불러오기 실패", error);
                // navigate(`./empty-challenge`);
            }
        };

        console.log("제발 좀 되게해주세요.");

        fetchData(); // fetchData 함수 호출
    }, []);

    useEffect(() => {
        if (!currentChallengeList) return;
        const updatedCurrentGroupChallengeList = [];
        const updatedLastChallenge = [];
        // if (!updatedCurrentGroupChallengeList.length) {
        //     navigate(`./empty-challenge`);
        // }

        for (let i = 0; i < currentChallengeList.length; i++) {
            const challenge = currentChallengeList[i];
            if (challenge.status === "PROGRESS") {
                updatedCurrentGroupChallengeList.push(challenge);
            } else {
                updatedLastChallenge.push(challenge);
            }
        }
        if (updatedCurrentGroupChallengeList.length == 0) {
            navigate(`./empty-challenge`);
        } else {
            navigate(
                `./challenge/${updatedCurrentGroupChallengeList[0].challengeId}`
            );
        }

        setCurrentGroupChallengeList(updatedCurrentGroupChallengeList);
        setLastChallenge(updatedLastChallenge);
    }, [currentChallengeList]);

    // console.log(currentChallengeList);

    //선택된 챌린지 표시를 위한 상태
    const [selectedChallenge, setSelectedChallenge] = useState({
        index: null,
        list: null,
    });

    return (
        <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
                <AccordionButton display="flex" justifyContent="space-between">
                    <Box display="flex" alignItems="center" textAlign="left">
                        <img
                            src={challengeIcon}
                            alt="challengeIcon"
                            className="w-[20px] h-[20px] mr-2"
                        />
                        <p className=" text-lg font-bold">진행중인 챌린지</p>
                    </Box>

                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    <ul>
                        {currentGroupChallengeList?.length > 0
                            ? currentGroupChallengeList.map(
                                  (challenge, index) => (
                                      <Flex
                                          key={index}
                                          alignItems="center"
                                          className={`py-2 px-4 rounded-lg ${
                                              selectedChallenge.index ===
                                                  index &&
                                              selectedChallenge.list ===
                                                  "current"
                                                  ? "bg-[rgba(255,209,0,0.5)]"
                                                  : "hover:bg-damyellow"
                                          } hover:cursor-pointer`}
                                          onClick={() => {
                                              setSelectedChallenge({
                                                  index,
                                                  list: "current",
                                              });
                                              navigate(
                                                  `/group/${groupId}/challenge/${challenge.challengeId}`,
                                                  { state: { challenge } }
                                              );
                                              if (onClick) onClick();
                                          }}
                                      >
                                          <Circle
                                              size="2"
                                              bg="green.500"
                                              mr="2"
                                          />
                                          <li key={index}>
                                              <p className=" font-semibold">
                                                  {challenge.userName} 챌린지
                                              </p>
                                              <p className="text-xs">
                                                  {new Date(
                                                      challenge.createdAt
                                                  ).toLocaleDateString()}{" "}
                                                  시작
                                              </p>
                                          </li>
                                      </Flex>
                                  )
                              )
                            : null}
                        {currentGroupChallengeList?.length > 0 &&
                            !currentGroupChallengeList.some(
                                (challenge, index) =>
                                    challenge.userId === loginedUser.userId
                            ) && (
                                <Box px={3} py={2} display={"flex"}>
                                    <Flex
                                        alignItems="center"
                                        justifyContent={"center"}
                                        cursor="pointer"
                                        onClick={() => {
                                            navigate(
                                                `/group/${groupId}/create-challenge`
                                            );
                                            if (onClick) onClick();
                                        }}
                                    >
                                        <PlusSquareIcon marginRight="4px" />
                                        <Text fontSize={"xs"}>
                                            챌린지 생성하기
                                        </Text>
                                    </Flex>
                                </Box>
                            )}
                        {currentGroupChallengeList?.length === 0 && (
                            <>
                                <Box>
                                    <p className="text-xs text-gray-400 mb-2">
                                        활성화된 챌린지가 없습니다
                                    </p>
                                </Box>
                                <Box px={3} py={2} display={"flex"}>
                                    <Flex
                                        alignItems="center"
                                        justifyContent={"center"}
                                        cursor="pointer"
                                        onClick={() => {
                                            navigate(
                                                `/group/${groupId}/create-challenge`
                                            );
                                            if (onClick) onClick();
                                        }}
                                    >
                                        <PlusSquareIcon marginRight="4px" />
                                        <Text fontSize={"xs"}>
                                            챌린지 생성하기
                                        </Text>
                                    </Flex>
                                </Box>
                            </>
                        )}
                    </ul>
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <AccordionButton display="flex" justifyContent="space-between">
                    <Box display="flex" alignItems="center" textAlign="left">
                        <RepeatClockIcon
                            color="dam.yellow"
                            boxSize={5}
                            marginRight="2"
                        />
                        <p className=" text-lg font-bold">지난 챌린지</p>
                    </Box>

                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    <ul>
                        {lastChallenge.length > 0 ? (
                            lastChallenge.map((challenge, index) => (
                                <Flex
                                    key={index}
                                    alignItems="center"
                                    className={`py-2 px-4 rounded-lg ${
                                        selectedChallenge.index === index &&
                                        selectedChallenge.list === "last"
                                            ? "bg-[rgba(255,209,0,0.5)]"
                                            : "hover:bg-damyellow"
                                    } hover:cursor-pointer`}
                                    onClick={() => {
                                        setSelectedChallenge({
                                            index,
                                            list: "last",
                                        });
                                        navigate(
                                            `/group/${groupId}/last-challenge/${challenge.challengeId}`,
                                            { state: { challenge } }
                                        );
                                        if (onClick) onClick();
                                    }}
                                >
                                    {challenge.status === "SUCCESS" ? (
                                        <CheckCircleIcon
                                            size="4"
                                            color="green.500"
                                            mr="2"
                                        />
                                    ) : (
                                        <WarningIcon
                                            size="4"
                                            color="dam.gray"
                                            mr="2"
                                        />
                                    )}

                                    <li key={index}>
                                        <p className=" font-semibold">
                                            {challenge.userName} 챌린지
                                        </p>
                                        <p className="text-xs">
                                            {new Date(
                                                challenge.createdAt
                                            ).toLocaleDateString()}{" "}
                                            진행
                                        </p>
                                    </li>
                                </Flex>
                            ))
                        ) : (
                            <p className="text-xs text-gray-400 mb-2">
                                지난 챌린지가 없습니다
                            </p>
                        )}
                    </ul>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}

export default ChallengeList;
