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
} from "@chakra-ui/react";
import HomeTab from "./home-tab/HomeTab";
import TruthRoomTab from "./truth-room-tab/TruthRoomTab";
import RewardTab from "./reward-tab/RewardTab";
import StatusBar from "./status-bar/StatusBar";
import ArticleTab from "./article-tab/ArticleTab";
import { useEffect, useState } from "react";
import MessageCheckModal from "./completed-modal/message-check-modal/MessageCheckModal";
import ChallengeCompletedModal from "./completed-modal/ChallengeCompletedModal";
import BestCheerMemberModal from "./completed-modal/best-cheer/BestCheerMemberModal";
import ChallengeReport from "./completed-modal/challenge-report/ChallengeReport";
import PiggyBankFinished from "./completed-modal/piggy-bank/PiggyBankFinished";
import TitleText from "components/TitleText";
import bgHomeTab from "assets/images/bgHomeTab.png";
import bgArticleTab from "assets/images/bgArticleTab.jpg";
import bgRoomofTruth from "assets/images/bgRoomofTruth.jpg";
import bgRewardTab from "assets/images/bgRewardTab.jpg";
import { useRecoilValue } from "recoil";
import { challengeState } from "contexts/Challenge";
import { useParams } from "react-router-dom";
import { getChallengeInfo } from "apis/api/Group";

function GroupTab() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contentStep, setContentStep] = useState(0);
    const { groupId, challengeId } = useParams();

    const currentChallenge = getChallengeInfo(challengeId)

    useEffect(() => {
        // 조건 수정 필요
        // 모달 마지막에 navigate 하면 url이 하위 URL로 감.(/challenge/4/empty-challenge). 바꿔줘야 함.
        if ( currentChallenge.status === "OFF") {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    }, [currentChallenge.status]);

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
            <div className="min-w-[70vw] max-w-[70vw]">
                <Tabs
                    isFitted
                    colorScheme="yellow"
                    onChange={handleTabsChange}
                    index={tabIndex}
                >
                    <TabList>
                        {data.map((tab, index) => (
                            <Tab key={index}>{tab.label}</Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {data.map((tab, index) => (
                            <TabPanel p={0} key={index}>
                                {tab.content}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </div>
        );
    }

    // 2. Create an array of data
    const tabData = [
        {
            label: "홈",
            content: <HomeTab />,
            img: bgHomeTab,
            description:
                "챌린지 홈이에요! 담쪽이의 금연일지를 확인할 수 있어요.",
        },
        {
            label: "제보",
            content: <ArticleTab />,
            img: bgArticleTab,
            description:
                "담쪽이가 흡연하는 장면을 목격했다면 증언이나 증거를 제출해주세요! 제보가 발생하면 진실의 방이 생성됩니다.",
        },
        {
            label: "진실의 방",
            content: <TruthRoomTab />,
            img: bgRoomofTruth,
            description: "담쪽이가 흡연했다는 제보가 들어온다면, 검증하세요.",
        },
        {
            label: "리워드",
            content: <RewardTab />,
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
                <ModalContent maxW={"1000px"} margin={"auto"}>
                    <ModalBody paddingY={20}>{contents[contentStep]}</ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default GroupTab;
