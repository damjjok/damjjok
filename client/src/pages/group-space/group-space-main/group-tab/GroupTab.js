import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import HomeTab from "../home-tab/HomeTab";
import EvidenceTab from "../evidence-tab/EvidenceTab";
import TruthRoomTab from "../truth-room-tab/TruthRoomTab";
import RewardTab from "../reward-tab/RewardTab";
import StatusBar from "../statusbar/StatusBar";

function GroupTab() {
    // 1. Create the component
    function DataTabs({ data }) {
        return (
            <div>
                <StatusBar/>
                <Tabs isFitted colorScheme="yellow" >
                    <TabList>
                        {data.map((tab, index) => (
                            <Tab key={index}>{tab.label}</Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {data.map((tab, index) => (
                            <TabPanel  p={4} key={index}>
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
            content: <EvidenceTab />,
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
    return <DataTabs data={tabData} />;
}

export default GroupTab;
