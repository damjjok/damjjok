import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

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
                        <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}

export default ReportTab;
