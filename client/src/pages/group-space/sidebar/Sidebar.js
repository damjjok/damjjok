import GroupList from "./group-list/GroupList";
import ChallengeList from "./challenge-list/ChallengeList";
import SettingButton from "./setting-button/SettingButton";
import { Box, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getChallengeList } from "apis/api/Group";

function Sidebar() {


    return (
        <Box borderRight={"1px solid rgba(214,214,214,0.25)"} height={"90vh"} minWidth={'250px'} width={"20vw"} maxWidth={'250px'}>
            <div className="flex flex-col h-300px px-4">
                <Flex justifyContent="space-between" alignItems="center" className="my-8">
                    <GroupList />
                    <SettingButton />
                </Flex>
                <div className="my-8">
                    <ChallengeList />
                </div>
            </div>
        </Box>
    );
}

export default Sidebar;
