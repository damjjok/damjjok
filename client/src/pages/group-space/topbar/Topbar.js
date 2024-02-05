import { useRecoilValue } from "recoil";
import BasicButton from "../../../components/button/BasicButton";
import { currentUserState } from "../../../contexts/User";
import logo from "assets/images/logo.png";
import { Box, Button, Flex, Icon, IconButton, Wrap, WrapItem, theme } from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function Topbar() {
    const currentUser = useRecoilValue(currentUserState);
    return (
        <Box className="flex justify-between py-4 border-b border-damlightgray/25" height={"10vh"}>
            <Flex justifyContent={"center"} alignItems={"center"}>
                <Link to={""}>
                    <img src={logo} className="max-h-12 px-4" alt="logo" />
                </Link>
            </Flex>

            <div className="flex justify-center items-center">
                <Flex justifyContent={"center"} alignItems={"center"} backgroundColor={"#D9D9D9"} padding={".5em"} borderRadius={"30px"}>
                    <p className="font-semibold px-2">안녕하세요! {currentUser.userName} 님!</p>
                    <Button rounded={"20px"} backgroundColor={"#FFD100"} _hover={{ backgroundColor: "#3182CE" }}>
                        로그아웃
                    </Button>
                </Flex>
                <Wrap>
                    <Button marginX={"1em"} backgroundColor={"#FFD100"} borderRadius={"50%"} width={"50%"} _hover={{ backgroundColor: "#3182CE" }}>
                        <BellIcon></BellIcon>
                        <Wrap
                            position={"absolute"}
                            right={"-10%"}
                            top={"-10%"}
                            backgroundColor={"red"}
                            width={"50%"}
                            height={"50%"}
                            borderRadius={"50%"}
                            justify={"center"}
                        >
                            <WrapItem>1</WrapItem>
                        </Wrap>
                    </Button>
                </Wrap>
            </div>
        </Box>
    );
}

export default Topbar;
