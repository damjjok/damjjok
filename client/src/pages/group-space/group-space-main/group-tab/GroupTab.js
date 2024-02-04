import { Tabs, TabList, TabPanels, Tab, TabPanel, Modal, ModalOverlay, ModalContent, ModalBody, Flex } from "@chakra-ui/react";
import HomeTab from "./home-tab/HomeTab";
import TruthRoomTab from "./truth-room-tab/TruthRoomTab";
import RewardTab from "./reward-tab/RewardTab";
import StatusBar from "./status-bar/StatusBar";
import ArticleTab from "./article-tab/ArticleTab";
import { useEffect, useState } from "react";
import { StarIcon } from "@chakra-ui/icons";
import BasicButton from "components/button/BasicButton";
import MessageCheckModal from "./completed-modal/message-check-modal/MessageCheckModal";
import ChallengeCompletedModal from "./completed-modal/ChallengeCompletedModal";
import BestCheerMemberModal from "./completed-modal/best-cheer/BestCheerMemberModal";

// 테스트용 더미데이터
const challenge = {
    key: "challengeState", // unique ID (with respect to other atoms/selectors)
    challengeId: 0,
    groupId: 0,
    duration: 30,
    initialMoney: "",
    savedPeriod: "",
    savedMoney: "",
    createdAt: new Date(),
    status: "completed",
    // status: 'ing',
    determination: "오늘 하루도,,, 홧팅 ^^@@",
    profilePath: "",

};

function GroupTab() {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contentStep, setContentStep] = useState(0);

    useEffect(() => {
        if (challenge.status === 'completed') {
          setIsModalOpen(true);
        } else {
          setIsModalOpen(false);
        }
      }, [challenge.status]);

      const nextContent = () => setContentStep(contentStep + 1);
      const closeModal = () => {
        setIsModalOpen(false);
        setContentStep(0);  // 모달을 닫을 때는 내용 단계를 초기화
      };
      const contents = [
        <ChallengeCompletedModal nextContent={nextContent}/>,
        <MessageCheckModal nextContent={nextContent} />,
        <BestCheerMemberModal nextContent={nextContent}/>,
        ]

    // 1. Create the component
    function DataTabs({ data }) {
        return (
            <div>
                <StatusBar />
                <Tabs isFitted colorScheme="yellow" marginTop={"2rem"}>
                    <TabList>
                        {data.map((tab, index) => (
                            <Tab key={index}>{tab.label}</Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {data.map((tab, index) => (
                            <TabPanel p={4} key={index}>
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
        },
        {
            label: "제보",
            content: <ArticleTab />,
        },
        {
            label: "진실의 방",
            content: <TruthRoomTab />,
        },
        {
            label: "리워드",
            content: <RewardTab />,
        },
    ];

    // 3. Pass the props and chill!
    return (
    <>
        <DataTabs data={tabData} />
        <Modal isOpen={isModalOpen} onClose={closeModal} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent maxW={'1000px'} margin={'auto'}>
                {contents[contentStep]}
            </ModalContent>
        </Modal>
    </>

    )
}

export default GroupTab;
