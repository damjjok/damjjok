import { useRecoilValue } from "recoil";
import BasicButton from "../../../components/button/BasicButton";
import { currentUser, currentUserState } from "../../../contexts/User";
import logo from "assets/images/logo.png";
import { Box, Flex, Text, Wrap, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkNotification, getAlarmList } from "apis/api/Notification";
import NotificationPopover from "./notification-list/NotificationPopover";

function Topbar() {
    const user = useRecoilValue(currentUser);
    const [alramList, setAlramList] = useState([]);
    const isMobile = useBreakpointValue({ base: true, md: false });
    const fetchAlram = async () => {
        const list = await getAlarmList();
        setAlramList(list);
    };

    const notificationClickHandler = async (notificationId) => {
        await checkNotification(notificationId);
        await fetchAlram();
    };
    useEffect(() => {
        fetchAlram();
    }, []);

    return (
        <Box
            className="flex justify-between py-4 border-b border-damlightgray/25"
            height={isMobile ? "6vh" : "8vh"}
        >
            <Flex
                width={isMobile ? "25vw" : "none"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Link to={`/group-list`}>
                    <img src={logo} className="max-h-12 px-4" alt="logo" />
                </Link>
            </Flex>

            <Box className="flex justify-center items-center">
                <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    backgroundColor={"#D9D9D9"}
                    padding={isMobile ? "0.2em" : "0.5em"}
                    borderRadius={"30px"}
                >
                    {isMobile ? (
                        <Text fontSize="xs" className="font-semibold px-2">
                            {user.userName} 님
                        </Text>
                    ) : (
                        <Text
                            fontSize={isMobile ? "sm" : "md"}
                            className="font-semibold px-2"
                        >
                            안녕하세요! {user.userName} 님!
                        </Text>
                    )}
                    <BasicButton
                        // rounded={"20px"}
                        // backgroundColor={"#FFD100"}
                        buttonName={"로그아웃"}
                        variant={"smbtn"}
                        _hover={{ backgroundColor: "#3182CE" }}
                    >
                        로그아웃
                    </BasicButton>
                </Flex>
                <Wrap sx={{ transform: isMobile ? "scale(0.6)" : "none" }}>
                    <NotificationPopover
                        alramList={alramList}
                        isMobile={isMobile}
                        clickHandler={notificationClickHandler}
                    ></NotificationPopover>
                </Wrap>
            </Box>
        </Box>
    );
}

export default Topbar;
