import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    VStack,
    Box,
    useBreakpointValue,
} from "@chakra-ui/react";
import HomeTabPage from "../home-tab-page/HomeTabPage";
import TruthRoomTabPage from "../truth-room-tab-page/TruthRoomTabPage";
import RewardTabPage from "../reward-tab-page/RewardTabPage";
import StatusBar from "./status-bar/StatusBar";
import ProofTabPage from "../proof-tap-page/ProofTabPage";
import React, { useEffect, useState } from "react";
import MessageCheckModal from "./modal/completed-modal/message-check-modal/MessageCheckModal";
import ChallengeCompletedModal from "./modal/completed-modal/ChallengeCompletedModal";
import BestCheerMemberModal from "./modal/completed-modal/best-cheer/BestCheerMemberModal";
import ChallengeReport from "./modal/completed-modal/challenge-report/ChallengeReport";
import PiggyBankFinished from "./modal/completed-modal/piggy-bank/PiggyBankFinished";
import TitleText from "components/TitleText";
import bgHomeTab from "assets/images/bgHomeTab.png";
import bgArticleTab from "assets/images/bgArticleTab.jpg";
import bgRoomofTruth from "assets/images/bgRoomofTruth.jpg";
import bgRewardTab from "assets/images/bgRewardTab.jpg";
import { useRecoilState, useRecoilValue } from "recoil";
import { challengeState } from "contexts/Challenge";
import { useParams } from "react-router-dom";
import { getChallengeInfo } from "apis/api/Challenge";
import { currentUser } from "contexts/User";

function ChallengePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contentStep, setContentStep] = useState(0);
    const { groupId, challengeId } = useParams();

    const [currentChallenge, setCurrentChallenge] =
        useRecoilState(challengeState);

    const loginedUser = useRecoilValue(currentUser);
    const isMobile = useBreakpointValue({ base: true, md: false });

    let today = new Date();
    const startedDate = new Date(currentChallenge.createdAt);

    // 두 날짜 사이의 밀리초 차이를 계산합니다.
    const diffMilliseconds = today.getTime() - startedDate.getTime();
    const diffDays = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getChallengeInfo(challengeId);
                const updatedChallenge = response.dto;
                setCurrentChallenge(updatedChallenge); // Recoil 상태에 데이터 적용
                // console.log(updatedChallenge);
            } catch (error) {
                console.error("챌린지 정보 불러오기 실패", error);
            }
        };

        fetchData(); // fetchData 함수 호출
    }, [challengeId]);

    useEffect(() => {
        if (
            currentChallenge.userId === loginedUser.userId &&
            //테스트용 코드
            // currentChallenge.status === "PROGRESS"

            // 챌린지 기한이 diffDays와 같아질 때
            currentChallenge.duration === diffDays
        ) {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    }, [currentChallenge]);

    const nextContent = () => setContentStep(contentStep + 1);
    const closeModal = () => {
        setIsModalOpen(false);
        setContentStep(0); // 모달을 닫을 때는 내용 단계를 초기화
    };
    const contents = [
        <ChallengeCompletedModal nextContent={nextContent} />,
        <MessageCheckModal nextContent={nextContent} />,
        <BestCheerMemberModal nextContent={nextContent} />,
        <ChallengeReport nextContent={nextContent} />,
        <PiggyBankFinished nextContent={nextContent} />,
    ];

    // 현재 선택된 탭의 인덱스를 상태로 추적
    const [tabIndex, setTabIndex] = useState(0);

    // 탭이 변경되었을 때 호출되는 함수
    const handleTabsChange = (index) => {
        setTabIndex(index);
    };

    // 1. Create the component
    function DataTabs({ data }) {
        return (
            <Box>
                <Tabs
                    isFitted
                    colorScheme="yellow"
                    onChange={handleTabsChange}
                    index={tabIndex}
                >
                    <TabList>
                        {data.map((tab, index) => (
                            <Tab
                                key={index}
                                fontSize={isMobile ? "xs" : "none"}
                                fontWeight={"semibold"}
                            >
                                {tab.label}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {data.map((tab, index) => (
                            <TabPanel p={0} key={index}>
                                <Box width={isMobile ? "90vw" : "70vw"}>
                                    {tab.content}
                                </Box>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </Box>
        );
    }

    // 2. Create an array of data
    const tabData = [
        {
            label: "홈",
            content: <HomeTabPage />,
            img: bgHomeTab,
            description:
                "챌린지 홈이에요! 담쪽이의 금연일지를 확인할 수 있어요.",
        },
        {
            label: "제보",
            content: <ProofTabPage />,
            img: bgArticleTab,
            description:
                "담쪽이가 흡연하는 장면을 목격했다면 제보하세요. 진실의 방이 생성됩니다.",
        },
        {
            label: "진실의 방",
            content: <TruthRoomTabPage />,
            img: bgRoomofTruth,
            description: "담쪽이가 흡연했다는 제보가 들어온다면, 검증하세요.",
        },
        {
            label: "리워드",
            content: <RewardTabPage />,
            img: bgRewardTab,
            description:
                "금연 챌린지에 성공하면 받게 될 선물을 미리 볼 수 있어요.",
        },
    ];

    // 3. Pass the props and chill!
    return (
        <>
            <VStack>
                <StatusBar />
                <TitleText
                    fontSize="2rem"
                    img={tabData[tabIndex].img}
                    description={tabData[tabIndex].description}
                >
                    {tabData[tabIndex].label}
                </TitleText>

                <DataTabs data={tabData} />
            </VStack>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent
                    maxW={isMobile ? "100vw" : "1000px"}
                    margin={"auto"}
                >
                    <ModalBody paddingY={20}>{contents[contentStep]}</ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ChallengePage;
