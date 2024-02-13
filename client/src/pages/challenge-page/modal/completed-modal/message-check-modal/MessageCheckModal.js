import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
    useBreakpointValue,
    useDisclosure,
} from "@chakra-ui/react";
import BasicButton from "components/button/BasicButton";
import postbox from "assets/images/postboxMain.png";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import messageBg from "assets/images/messageBg.png";
import WholeMessageList from "./WholeMessageList";
import { challengeCheerMessageList } from "contexts/Challenge";
import { useRecoilValue } from "recoil";

//더미 데이터
// const messages = [
//     {
//         writer: "작성자1",
//         content: "안녕잘지내니테스트용으로메시지를길게넣어보려고해",
//     },
//     { writer: "작성자2", content: "사실처음봤을때부터...더보기" },
//     { writer: "작성자3", content: "이편지는영국에서시작되어..." },
//     { writer: "작성자4", content: "[WEB발신] 너는 나를 존중해야 하고" },
//     { writer: "작성자5", content: "메시지 5" },
//     { writer: "작성자6", content: "메시지 6" },
//     { writer: "작성자7", content: "메시지 7" },
//     { writer: "작성자8", content: "메시지 8" },
//     { writer: "작성자9", content: "메시지 9" },
// ];

function MessageCheckModal({ nextContent, isExpired }) {
    const [isMessagesVisible, setIsMessagesVisible] = useState(false);
    const [displayCount, setDisplayCount] = useState(8); // 메시지 표시 개수 상태
    const messages = useRecoilValue(challengeCheerMessageList);
    const isMobile = useBreakpointValue({ base: true, md: false });

    const handleClick = () => {
        setIsMessagesVisible(true);
    };

    return (
        <>
            <VStack position="relative">
                <Box mb={6} textAlign={"center"}>
                    <Heading fontSize={isMobile ? "xl" : "xx-large"}>
                        내가 금연 중일 때
                    </Heading>
                    <Heading fontSize={isMobile ? "xl" : "xx-large"}>
                        어떤 메시지들이 쌓여 있었을까요?
                    </Heading>
                </Box>
                <img
                    src={postbox}
                    alt="postbox"
                    width={"300vw"}
                    onClick={handleClick}
                    style={{ cursor: "pointer" }}
                />
                <Box
                    position={"absolute"}
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    minWidth={"90%"}
                    width="60vw"
                >
                    <Flex flexWrap="wrap" justifyContent={"center"}>
                        <AnimatePresence>
                            {isMessagesVisible &&
                                messages
                                    .slice(0, displayCount)
                                    .map((message, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0 }}
                                        >
                                            <div
                                                // width={'20%'}
                                                // marginX='2rem'
                                                // marginY='2rem'
                                                // backgroundColor={'dam.yellow'}
                                                style={{
                                                    backgroundImage: `url(${messageBg})`,
                                                    backgroundSize: "cover",
                                                    backgroundPositon: "center",
                                                    // boxShadow: '20 10 20px 10px rgba(255, 255, 255, 0.7)',
                                                    transition: "0.5s",
                                                    minHeight: "10rem",
                                                    maxHeight: "10rem",
                                                    minWidth: "15rem",
                                                    maxWidth: "15rem",
                                                    padding: "80px",
                                                }}
                                            >
                                                <Box>
                                                    <Heading size="sm">
                                                        {message.userName}
                                                    </Heading>
                                                </Box>
                                                <Box>
                                                    <Text
                                                        noOfLines={2}
                                                        fontSize="sm"
                                                    >
                                                        {message.content}
                                                    </Text>
                                                </Box>
                                            </div>
                                        </motion.div>
                                    ))}
                        </AnimatePresence>
                    </Flex>
                    {isMessagesVisible && ( // 메시지가 더 있을 경우에만 '더보기' 버튼을 표시
                        <Flex justifyContent={"center"} my={4}>
                            <WholeMessageList messages={messages} />
                        </Flex>
                    )}
                    {isMessagesVisible &&
                        (!isExpired ? (
                            <Box
                                display={"flex"}
                                justifyContent={"center"}
                                marginY={4}
                            >
                                <BasicButton
                                    buttonName="다음으로"
                                    onClick={nextContent}
                                />
                            </Box>
                        ) : (
                            <></>
                        ))}
                </Box>
            </VStack>
        </>
    );
}

export default MessageCheckModal;
