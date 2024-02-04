import { Tabs, TabList, TabPanels, Tab, TabPanel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Flex } from "@chakra-ui/react";
import HomeTab from "./home-tab/HomeTab";
import TruthRoomTab from "./truth-room-tab/TruthRoomTab";
import RewardTab from "./reward-tab/RewardTab";
import StatusBar from "./status-bar/StatusBar";
import ArticleTab from "./article-tab/ArticleTab";
import { useEffect, useState } from "react";
import { StarIcon } from "@chakra-ui/icons";
import BasicButton from "components/button/BasicButton";

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
    determination: "오늘 하루도,,, 홧팅 ^^@@",
    profilePath: "",

};

function GroupTab() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        if (challenge.status === 'completed') {
          setIsModalOpen(true);
        } else {
          setIsModalOpen(false);
        }
      }, [challenge.status]);

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
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent maxW={'1000px'} margin={'auto'}>
                <Flex flexFlow={'column'} justifyContent={'center'} alignItems={'center'} marginY={20}>
                    <StarIcon boxSize={20} color='dam.yellow'/>
                    <ModalBody>
                        <p className=" font-extrabold text-4xl text-center">축하해요! 챌린지 도전에 성공했어요!</p>
                        <p className="font-semibold text-center">성공한 챌린지의 리포트를 확인할 수 있어요!</p>
                    </ModalBody>
                    <BasicButton buttonName={'리포트 확인하기'} variant={'bigbtn'}/>
                </Flex>
            </ModalContent>
        </Modal>
    </>

    )
}

export default GroupTab;
