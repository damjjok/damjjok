import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const tabs = [
    { name: "홈", path: "" },
    { name: "제보", path: "proof" },
    { name: "진실의 방", path: "truth-room" },
    { name: "리워드", path: "reward" },
];

const ChallengeTabs = () => {
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState("");
    return (
        <>
            <Box width={"100%"}>
                <Flex marginX={"10%"}>
                    {tabs.map((tab, index) => (
                        <Box
                            flex={1}
                            key={index}
                            onClick={() => {
                                setCurrentTab(tab.path);
                                navigate(`${tab.path}`);
                            }}
                            borderBottom={currentTab === tab.path ? `2px solid #FFD100` : `2px solid #D9D9D9`}
                            color={currentTab === tab.path ? `#FFD100` : `#121212`}
                            padding={3}
                            textAlign={"center"}
                            cursor={"pointer"}
                        >
                            <Text fontWeight={700}>{tab.name}</Text>
                        </Box>
                    ))}
                </Flex>
            </Box>
            <Box w="80%">
                <Outlet></Outlet>
            </Box>
        </>
    );
};

export default ChallengeTabs;
