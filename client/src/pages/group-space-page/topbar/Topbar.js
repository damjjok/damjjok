import { useRecoilValue } from "recoil";
import BasicButton from "../../../components/button/BasicButton";
import { currentUserState } from "../../../contexts/User";
import logo from "assets/images/logo.png";
import {
    Box,
    Button,
    Divider,
    Flex,
    Icon,
    IconButton,
    List,
    ListIcon,
    ListItem,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    Wrap,
    WrapItem,
    theme,
    useBreakpointValue,
} from "@chakra-ui/react";
import { BellIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function Topbar() {
    const currentUser = useRecoilValue(currentUserState);

    const isMobile = useBreakpointValue({ base: true, md: false });

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

            <div className="flex justify-center items-center">
                <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    backgroundColor={"#D9D9D9"}
                    padding={isMobile ? "0.2em" : "0.5em"}
                    borderRadius={"30px"}
                >
                    {isMobile ? (
                        <Text fontSize="xs" className="font-semibold px-2">
                            {currentUser.userName} 님
                        </Text>
                    ) : (
                        <Text
                            fontSize={isMobile ? "sm" : "md"}
                            className="font-semibold px-2"
                        >
                            안녕하세요! {currentUser.userName} 님!
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
                    {" "}
                    <Popover>
                        <PopoverTrigger>
                            <Button
                                marginX={isMobile ? "0.1em" : "1em"}
                                backgroundColor={"#FFD100"}
                                borderRadius={"50%"}
                                width={"50%"}
                                _hover={{ backgroundColor: "#3182CE" }}
                            >
                                <BellIcon></BellIcon>
                                <Wrap
                                    position={"absolute"}
                                    right={isMobile ? "0" : "-10%"}
                                    top={isMobile ? "0" : "-10%"}
                                    backgroundColor={"red"}
                                    width={isMobile ? "30%" : "50%"}
                                    height={isMobile ? "30%" : "50%"}
                                    borderRadius={"50%"}
                                    justify={"center"}
                                >
                                    {isMobile ? null : <WrapItem>1</WrapItem>}
                                </Wrap>
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>알림함</PopoverHeader>
                            <PopoverBody>
                                <List spacing={3}>
                                    <ListItem>
                                        <ListIcon
                                            as={CheckCircleIcon}
                                            color="green.500"
                                        />
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit
                                    </ListItem>
                                    <Divider></Divider>
                                    <ListItem>
                                        <ListIcon
                                            as={CheckCircleIcon}
                                            color="green.500"
                                        />
                                        Assumenda, quia temporibus eveniet a
                                        libero incidunt suscipit
                                    </ListItem>
                                    <ListItem>
                                        <ListIcon
                                            as={CheckCircleIcon}
                                            color="green.500"
                                        />
                                        Quidem, ipsam illum quis sed voluptatum
                                        quae eum fugit earum
                                    </ListItem>
                                    {/* You can also use custom icons from react-icons */}
                                    <ListItem>
                                        <ListIcon
                                            as={CheckCircleIcon}
                                            color="green.500"
                                        />
                                        Quidem, ipsam illum quis sed voluptatum
                                        quae eum fugit earum
                                    </ListItem>
                                </List>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Wrap>
            </div>
        </Box>
    );
}

export default Topbar;
