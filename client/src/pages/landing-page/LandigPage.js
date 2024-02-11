import {
    useDisclosure,
    Text,
    useBreakpointValue,
    Box,
    Button,
    Image,
    Flex,
    Grid,
} from "@chakra-ui/react";

import LoginModal from "./modal/LoginModal";
import FormModal from "./modal/FormModal";
import landingBg from "assets/images/bgimg.png";
import { dontTouchSnsLoginInfo } from "contexts/Sns";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import {} from "@chakra-ui/react";
import logo from "assets/images/logo.png";

const LandingPage = () => {
    // const { isOpen, onOpen, onClose } = useDisclosure();
    // 만약 api연결한다면 회원가입 버튼을 눌렀을때 같은 아이디가 db에 있는지 이메
    // 이메일 형식이 맞는지 조건을 걸어줘야함
    // 그리고 state 값 axios로 회원가입 할 때 보내줘야함

    const snsLoginInfo = useRecoilValue(dontTouchSnsLoginInfo);
    const isMobile = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        console.log(snsLoginInfo);
    }, []);

    const {
        isOpen: LoginisOpen,
        onOpen: LoginonOpen,
        onClose: LoginonClose,
    } = useDisclosure();
    const {
        isOpen: FormisOpen,
        onOpen: FormonOpen,
        onClose: FormonClose,
    } = useDisclosure();

    useEffect(() => {
        if (snsLoginInfo.email) {
            FormonOpen();
        }
    }, [snsLoginInfo]);
    return (
        <Flex direction="column" align="stretch" minH="100vh">
            {/* 상단 배경 이미지 컨테이너 */}
            <Box
                height="55vh"
                width="100vw"
                backgroundImage={`url(${landingBg})`}
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                position="relative"
            >
                <Image
                    src={logo}
                    width={isMobile ? "90px" : "150px"} // 모바일과 데스크톱에 맞는 크기 조정
                    height="auto" // 이미지의 비율을 유지하도록 높이를 'auto'로 설정
                    alignSelf="flex-start" // 로고를 왼쪽 상단으로 정렬
                    alt="Logo"
                    position="absolute" // 절대적 위치 지정
                    top="4"
                    left="24"
                />
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    position="absolute"
                    top="0"
                    right="0"
                    bottom="0"
                    left="0"
                >
                    <Text
                        fontSize={isMobile ? "x-large" : "5xl"}
                        fontWeight={600}
                        className="LandigTitle"
                        textAlign="center"
                        color="white"
                    >
                        세상에 나쁜 흡연자는 없다!
                    </Text>
                    {isMobile ? (
                        <Text fontSize={"sm"} textAlign="center">
                            우리 지금부터 함께, 금연해봐요!
                        </Text>
                    ) : (
                        <>
                            <Text
                                textAlign="center"
                                color="white"
                                fontSize="3xl"
                                mt={2}
                            >
                                흡연이 건강에 안 좋다는 것을 알지만 금연하기
                                어려운 당신
                            </Text>

                            <Text
                                textAlign="center"
                                color="white"
                                fontSize="xl"
                                mt={2}
                            >
                                함께라면 이겨낼 수 있지 않을까요? 함께 금연
                                생활을 시작해 봐요
                            </Text>
                        </>
                    )}
                    <Button
                        colorScheme="yellow"
                        size="lg"
                        onClick={LoginonOpen}
                        alignSelf="center"
                        mt="9"
                    >
                        시작하기
                    </Button>
                </Flex>
            </Box>

            {/* 나머지 페이지 컨텐츠 */}
            <Flex direction="column" flexGrow={1} p="4" overflowY="auto">
                <Box mb="4">
                    <Text>TV를 마음껏</Text>
                </Box>

                {/* '어디서나 자유롭게 시청하세요' 섹션 */}
                <Box mb="4">
                    <Text>TV를 마음껏</Text>
                </Box>

                {/* '어린이 전용 프로필을 만들어 보세요' 섹션 */}
                <Box mb="4" bg="blue.500" color="white">
                    {/* ... */}
                </Box>

                {/* 시작하기 버튼 */}

                {/* Login Modal */}
                <LoginModal isOpen={LoginisOpen} onClose={LoginonClose} />

                {/* Form Modal */}
                <FormModal isOpen={FormisOpen} onClose={FormonClose} />
            </Flex>
        </Flex>
    );
};

export default LandingPage;
