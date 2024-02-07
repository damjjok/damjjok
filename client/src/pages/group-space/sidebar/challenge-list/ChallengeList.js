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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import challengeIcon from "assets/images/currentChallengeIcon.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { challengeListState } from "contexts/Challenge";
import { getChallengeList } from "apis/api/Group";
// import { useRecoilValue } from "recoil";
// import { challengeListState } from "../../../../context/Challenge";

function ChallengeList() {
    const userId = 0;

    const { groupId } = useParams();
    // const setChallengeState = useSetRecoilState(challengeState);
    const [currentChallengeList, setCurrentChallengeList] = useState([]);
    const [currentGroupChallengeList, setCurrentGroupChallengeList] = useState(
        [],
    );
    const [lastChallenge, setLastChallenge] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getChallengeList(groupId);
                const updatedChallengeList = response.list;
                setCurrentChallengeList(updatedChallengeList); // currentChallengeList 업데이트

                // 반복문을 돌면서 각 요소의 status에 따라 currentGroupChallengeList와 lastChallenge 배열에 추가
                const updatedCurrentGroupChallengeList = [];
                const updatedLastChallenge = [];
                for (let i = 0; i < updatedChallengeList.length; i++) {
                    const challenge = updatedChallengeList[i];
                    if (challenge.status === "ON") {
                        updatedCurrentGroupChallengeList.push(challenge);
                    } else {
                        updatedLastChallenge.push(challenge);
                    }
                }

                setCurrentGroupChallengeList(updatedCurrentGroupChallengeList);
                setLastChallenge(updatedLastChallenge);
            } catch (error) {
                console.error("챌린지 정보 불러오기 실패", error);
            }
        };

        fetchData(); // fetchData 함수 호출
    }, [groupId]);

    console.log(currentChallengeList);

    //선택된 챌린지 표시를 위한 상태
    const [selectedChallenge, setSelectedChallenge] = useState({
        index: null,
        list: null,
    });
    const navigate = useNavigate();

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
                        {currentGroupChallengeList.length > 0 ? (
                            currentGroupChallengeList.map(
                                (challenge, index) => (
                                    <Flex
                                        alignItems="center"
                                        className={`py-2 px-4 rounded-lg ${
                                            selectedChallenge.index === index &&
                                            selectedChallenge.list === "current"
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
                                                { state: { challenge } },
                                            );
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
                                                    challenge.createdAt,
                                                ).toLocaleDateString()}{" "}
                                                시작
                                            </p>
                                        </li>
                                    </Flex>
                                    // 해당 챌린지 페이지로 향하는 링크 추가해야함.
                                ),
                            )
                        ) : (
                            <Box>
                                <p className="text-xs text-gray-400 mb-2">
                                    활성화된 챌린지가 없습니다
                                </p>
                                <Flex alignItems="center" cursor="pointer">
                                    {/* 생성하기 화면으로 가는 링크 추가해줄 것 */}
                                    <PlusSquareIcon marginRight="4px" />
                                    <p>챌린지 생성하기</p>
                                </Flex>
                            </Box>
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
                                            `/group/1/last-challenge/${challenge.challengeId}`,
                                            { state: { challenge } },
                                        );
                                    }}
                                >
                                    {challenge.status === "success" ? (
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
                                            {challenge.username} 챌린지
                                        </p>
                                        <p className="text-xs">
                                            {challenge.createdAt} 진행
                                        </p>
                                    </li>
                                </Flex>
                                // 해당 챌린지 페이지로 향하는 링크 추가해야함.
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
