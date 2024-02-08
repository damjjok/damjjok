import GroupList from "./group-list/GroupList";
import ChallengeList from "./challenge-list/ChallengeList";
import SettingButton from "./setting-button/SettingButton";
import {
    Box,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    IconButton,
    useBreakpointValue,
    useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getChallengeList } from "apis/api/Group";
import { HamburgerIcon } from "@chakra-ui/icons";

function Sidebar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <>
            {/* 모바일 화면일 때 햄버거 버튼 노출 */}
            {isMobile ? (
                <IconButton
                    aria-label="Open menu"
                    icon={<HamburgerIcon />}
                    onClick={onOpen}
                    size="lg"
                />
            ) : (
                <Box
                    borderRight={"1px solid rgba(214,214,214,0.25)"}
                    height={"90vh"}
                    minWidth={"250px"}
                    width={"20vw"}
                    maxWidth={"250px"}
                >
                    <div className="flex flex-col h-300px px-4">
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                            className="my-8"
                        >
                            <GroupList />
                            <SettingButton />
                        </Flex>
                        <div className="my-8">
                            <ChallengeList onClick={undefined} />
                        </div>
                    </div>
                </Box>
            )}

            {/* 모바일 화면에서 사이드바 역할을 하는 드로어 */}
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay>
                    <DrawerContent>
                        <div className="flex flex-col h-300px px-4">
                            <Flex
                                justifyContent="space-between"
                                alignItems="center"
                                className="my-8"
                            >
                                <GroupList />
                                <SettingButton />
                            </Flex>
                            <div className="my-8">
                                <ChallengeList onClick={onClose} />
                            </div>
                        </div>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
}

export default Sidebar;
