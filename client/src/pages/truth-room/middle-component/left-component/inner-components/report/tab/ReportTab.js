import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
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
        <div>
            <Tabs
                isFitted
                variant="enclosed"
                onChange={(index) =>
                    changeReportMode(index === 0 ? "EVIDENCE" : "TESTIMONY")
                }
            >
                <TabList mb="1em">
                    <Tab>목격 사진</Tab>
                    <Tab>목격담</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <EvidenceComponent />
                    </TabPanel>
                    <TabPanel>
                        <TestimonyComponent />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}

export default ReportTab;
