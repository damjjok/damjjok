import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import bgHomeTab from "assets/images/bgHomeTab.png";
import bgArticleTab from "assets/images/bgArticleTab.jpg";
import bgRoomofTruth from "assets/images/bgRoomofTruth.jpg";
import bgRewardTab from "assets/images/bgRewardTab.jpg";
import TitleText from "components/TitleText";

const tabs = [
    { name: "홈", path: "" },
    { name: "제보", path: "proof" },
    { name: "진실의 방", path: "truth-room" },
    { name: "리워드", path: "reward" },
];
const tabData = [
    {
        label: "홈",
        img: bgHomeTab,
        description: "챌린지 홈이에요! 담쪽이의 금연일지를 확인할 수 있어요.",
    },
    {
        label: "제보",
        img: bgArticleTab,
        description: "담쪽이가 흡연하는 장면을 목격했다면 제보하세요. 진실의 방이 생성됩니다.",
    },
    {
        label: "진실의 방",
        img: bgRoomofTruth,
        description: "담쪽이가 흡연했다는 제보가 들어온다면, 검증하세요.",
    },
    {
        label: "리워드",
        img: bgRewardTab,
        description: "금연 챌린지에 성공하면 받게 될 선물을 미리 볼 수 있어요.",
    },
];

const ChallengeTabs = () => {
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState(0);
    const { challengeId } = useParams();
    useEffect(() => {
        setCurrentTab(0);
    }, [challengeId]);
    return (
        <>
            <TitleText fontSize="2rem" img={tabData[currentTab].img} description={tabData[currentTab].description}>
                {tabData[currentTab].label}
            </TitleText>
            <Box width={"80vw"}>
                <Flex marginX={"10%"}>
                    {tabs.map((tab, index) => (
                        <Box
                            flex={1}
                            key={index}
                            onClick={() => {
                                setCurrentTab(index);
                                navigate(`${tab.path}`);
                            }}
                            borderBottom={currentTab === index ? `2px solid #FFD100` : `2px solid #D9D9D9`}
                            color={currentTab === index ? `#FFD100` : `#121212`}
                            padding={3}
                            textAlign={"center"}
                            cursor={"pointer"}
                        >
                            <Text fontWeight={700}>{tab.name}</Text>
                        </Box>
                    ))}
                </Flex>
            </Box>
            <Box w="80vw">
                <Outlet></Outlet>
            </Box>
        </>
    );
};

export default ChallengeTabs;
