import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import TestimonyComponent from "../testimony/TestimonyComponent";

function ReportTab(props) {
    return (
        <div>
            <Tabs isFitted variant="enclosed">
                <TabList mb="1em">
                    <Tab>목격 사진</Tab>
                    <Tab>목격담</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <p>one!</p>
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
