import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import TestimonyComponent from "../testimony/TestimonyComponent";
import EvidenceComponent from "../evidence/EvidenceComponent";
import { useSetRecoilState } from "recoil";
import { reportModeState } from "contexts/TruthRoom";

function ReportTab(props) {
    const setReportMode = useSetRecoilState(reportModeState);

    function changeReportMode(mode) {
        setReportMode(mode);
        console.log("report mode changed to " + mode);
    }

    return (
        <Box height={"100%"}>
            <Tabs
                isFitted
                colorScheme="yellow"
                onChange={(index) =>
                    changeReportMode(index === 0 ? "EVIDENCE" : "TESTIMONY")
                }
            >
                <TabList>
                    <Tab>증거</Tab>
                    <Tab>증언</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel
                        p={0}
                        paddingLeft={2}
                        paddingY={2}
                        paddingRight={1}
                    >
                        <EvidenceComponent />
                    </TabPanel>
                    <TabPanel>
                        <TestimonyComponent />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}

export default ReportTab;
