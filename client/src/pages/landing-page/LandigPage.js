import { useDisclosure, Text, useBreakpointValue, Box, Button, Image, Flex, HStack } from "@chakra-ui/react";

import LoginModal from "./modal/LoginModal";
import FormModal from "./modal/FormModal";
import landingBg from "assets/images/bgimg.png";
import { dontTouchSnsLoginInfo } from "contexts/Sns";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import {} from "@chakra-ui/react";
import logo from "assets/images/logo.png";
import { ChevronDownIcon } from "@chakra-ui/icons";
import BasicButton from "components/button/BasicButton";

const LandingPage = () => {
    // const { isOpen, onOpen, onClose } = useDisclosure();
    // 만약 api연결한다면 회원가입 버튼을 눌렀을때 같은 아이디가 db에 있는지 이메
    // 이메일 형식이 맞는지 조건을 걸어줘야함
    // 그리고 state 값 axios로 회원가입 할 때 보내줘야함

    const [showButton, setShowButton] = useState(false);
    const isMobile = useBreakpointValue({ base: true, md: false });

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
        const position = window.pageYOffset;
        const screenHeight = window.innerHeight;
        // 배경 이미지의 높이(여기서는 화면 높이와 동일하다고 가정)보다 스크롤이 더 내려갔을 때 버튼을 표시
        setShowButton(position > screenHeight);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const snsLoginInfo = useRecoilValue(dontTouchSnsLoginInfo);

    useEffect(() => {
        console.log(snsLoginInfo);
    }, []);

    const { isOpen: LoginisOpen, onOpen: LoginonOpen, onClose: LoginonClose } = useDisclosure();
    const { isOpen: FormisOpen, onOpen: FormonOpen, onClose: FormonClose } = useDisclosure();

    useEffect(() => {
        if (snsLoginInfo.email) {
            FormonOpen();
        }
    }, [snsLoginInfo]);

    return (
        <Flex direction="column" align="stretch" minH="100vh">
            {/* 상단 배경 이미지 컨테이너 */}
            <Box
                height="100vh"
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
                    top="2%"
                    left="10%"
                />
                <Flex direction="column" align="center" justify="center" position="absolute" top="0" right="0" bottom="0" left="0">
                    <Text fontSize={isMobile ? "x-large" : "5xl"} fontWeight={700} className="LandigTitle" textAlign="center" color="white" mt={12}>
                        세상에 나쁜 흡연자는 없다!
                    </Text>
                    {isMobile ? (
                        <Text fontSize={"sm"} textAlign="center">
                            우리 지금부터 함께, 금연해봐요!
                        </Text>
                    ) : (
                        <>
                            <Text textAlign="center" color="white" fontSize="3xl" mt={2}>
                                금연하고 싶지만 실패하거나 어려운 당신
                            </Text>

                            <Text textAlign="center" color="white" fontSize="xl" mt={2}>
                                함께라면 이겨낼 수 있지 않을까요? 함께 금연 생활을 시작해 봐요
                            </Text>
                        </>
                    )}
                    <Box mt={9}>
                        <BasicButton bg="#ffd100" size="lg" onClick={LoginonOpen} alignSelf="center" buttonName={"시작하기"} variant={"bigbtn"}>
                            시작하기
                        </BasicButton>
                    </Box>

                    {/* 기존 컨텐츠 */}

                    {/* 화살표 애니메이션 */}
                </Flex>
                <Box
                    position="absolute"
                    bottom="20px"
                    left="50%"
                    animation="bounce 2s infinite"
                    css={{
                        "@keyframes bounce": {
                            "0%, 100%": {
                                transform: "translate(-50%, 0)",
                            },
                            "50%": {
                                transform: "translate(-50%,-20px)",
                            },
                        },
                    }}
                >
                    <ChevronDownIcon color="#fdd100" boxSize="8rem" />
                </Box>
            </Box>

            {showButton && (
                <Flex
                    position="fixed"
                    bottom="50px"
                    left="0"
                    right="0"
                    justifyContent="center"
                    zIndex="banner"
                    animation="slideDown 0.5s ease-out forwards"
                    css={{
                        "@keyframes slideDown": {
                            "0%": { transform: "translateY(100%)" },
                            "100%": { transform: "translateY(0%)" },
                        },
                    }}
                >
                    <BasicButton size="lg" bg="#ffd100" buttonName={"시작하기"} variant={"bigbtn"} onClick={LoginonOpen}>
                        시작하기
                    </BasicButton>
                </Flex>
            )}

            {/* 나머지 페이지 컨텐츠 */}
            <Flex direction="column" flexGrow={1} m={0} p={0} id="introduce-page">
                <Box height="45vh" bg="black" borderBottom="8px solid" borderColor="gray.800">
                    <HStack spacing={0} height="100%" py={16} mx="10%">
                        {/* 텍스트 영역 */}
                        <Box flex="1">
                            <Text color="white" fontSize="3xl" fontWeight={800}>
                                주변 사람들과 함께 금연에 도전하세요.
                            </Text>
                            <Text color="white" fontSize="xl" mt={3} fontWeight={500}>
                                주변 사람들을 초대해서 함께 챌린지에 도전해보세요.
                                <br />
                                챌린지를 함께 공유하며 금연 스케쥴을 관리할 수 있어요.
                            </Text>
                        </Box>

                        {/* 이미지 영역 */}
                        <Box flex="1">
                            {/* 여기에 Image 컴포넌트를 사용하거나, backgroundImage 속성을 사용할 수 있습니다. */}
                            <Image src={logo} alt="설명" objectFit="cover" height="100%" width="100%" />
                        </Box>
                    </HStack>
                </Box>
                <Box height="45vh" bg="black" borderBottom="8px solid" borderColor="gray.800">
                    <HStack spacing={0} height="100%" py={16} mx="15%">
                        {/* 텍스트 영역 */}

                        {/* 이미지 영역 */}
                        <Box flex="1">
                            {/* 여기에 Image 컴포넌트를 사용하거나, backgroundImage 속성을 사용할 수 있습니다. */}
                            <Image src={logo} alt="설명" objectFit="cover" height="100%" width="100%" />
                        </Box>
                        <Box flex="1">
                            <Text color="white" fontSize="3xl" fontWeight={800}>
                                더 자유롭게, 더 재밌게 도전해보세요!
                            </Text>
                            <Text color="white" fontSize="xl" mt={3} fontWeight={500}>
                                더 재미있는 챌린지를 위해, 금연 저금통을 사용하세요.
                                <br />
                                챌린지 성공시, 금연하며 아낀 돈을 확인할 수 있으며 실패시 모은 돈을 그룹원들과 나눌 수 있어요.
                            </Text>
                        </Box>
                    </HStack>
                </Box>
                <Box height="45vh" bg="black" borderBottom="8px solid" borderColor="gray.800">
                    <HStack spacing={0} height="100%" py={16} mx="15%">
                        {/* 텍스트 영역 */}
                        <Box flex="1">
                            <Text color="white" fontSize="3xl" fontWeight={800}>
                                금연 생활을 관찰하세요!
                            </Text>
                            <Text color="white" fontSize="xl" mt={3} fontWeight={500}>
                                실시간으로 글이나 사진을 제보할 수 있어요.
                                <br /> 제보가 들어오면, 진실의 방에서 담쪽이의 챌린지 결과를 정할 수 있어요.
                            </Text>
                        </Box>

                        {/* 이미지 영역 */}
                        <Box flex="1">
                            {/* 여기에 Image 컴포넌트를 사용하거나, backgroundImage 속성을 사용할 수 있습니다. */}
                            <Image src={logo} alt="설명" objectFit="cover" height="100%" width="100%" />
                        </Box>
                    </HStack>
                </Box>
                <Box height="45vh" bg="black" borderBottom="8px solid" borderColor="gray.800">
                    <HStack spacing={0} height="100%" py={16} mx="15%">
                        {/* 이미지 영역 */}
                        <Box flex="1">
                            {/* 여기에 Image 컴포넌트를 사용하거나, backgroundImage 속성을 사용할 수 있습니다. */}
                            <Image src={logo} alt="설명" objectFit="cover" height="100%" width="100%" />
                        </Box>
                        {/* 텍스트 영역 */}
                        <Box flex="1">
                            <Text color="white" fontSize="3xl" fontWeight={800}>
                                금연 생활을 응원하세요!
                            </Text>
                            <Text color="white" fontSize="xl" mt={3} fontWeight={500}>
                                격려와 응원의 메시지를 보내주세요! <br />
                                챌린지가 성공했을 때 담쪽이가 메시지를 확인할 수 있어요.
                            </Text>
                        </Box>
                    </HStack>
                </Box>

                {/* Login Modal */}
                <LoginModal LoginisOpen={LoginisOpen} LoginonClose={LoginonClose} LoginonOpen={LoginonOpen} />

                {/* Form Modal */}
                <FormModal FormisOpen={FormisOpen} FormonOpen={FormonOpen} FormonClose={FormonClose} />
            </Flex>
        </Flex>
    );
};

export default LandingPage;
