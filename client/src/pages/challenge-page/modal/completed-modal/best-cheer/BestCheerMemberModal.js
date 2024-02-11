import { Box, Flex, ModalBody, Text, VStack } from "@chakra-ui/react";
import BasicButton from "components/button/BasicButton";
import crownImg from "assets/gifs/crown.gif";
import sendLetterImg from "assets/gifs/sendLetter.gif";
import candyImg from "assets/gifs/candy.gif";
import { useRecoilValue } from "recoil";
import { challengeBestMember } from "contexts/Challenge";
import { currentUser } from "contexts/User";

function BestCheerMemberModal({ nextContent }) {
    const loginedUser = useRecoilValue(currentUser);
    const bestCheerMember = useRecoilValue(challengeBestMember);
    return (
        <>
            <Flex
                flexFlow={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                marginY={20}
            >
                {/* <StarIcon boxSize={20} color='dam.yellow'/> */}
                <Flex flexFlow={"column"} alignItems={"center"} marginY={6}>
                    <p className=" font-extrabold text-4xl text-center">
                        {loginedUser.userName}님의
                    </p>
                    <Text
                        fontWeight={"extrabold"}
                        fontSize={"4xl"}
                        textAlign={"center"}
                    >
                        이번 챌린지 응원왕은...
                    </Text>
                    <img
                        src={crownImg}
                        alt="crownImg"
                        style={{
                            clipPath: "inset(0 0 20% 0",
                            width: "200px",
                            height: "200px",
                            objectFit: "cover",
                        }}
                    />
                    <VStack justifyContent={"center"}>
                        <Text fontSize={"3xl"} fontWeight={"bold"}>
                            {bestCheerMember.userName}님 입니다!!
                        </Text>
                        <Box display={"flex"} alignItems={"center"}>
                            <img
                                src={sendLetterImg}
                                alt="sendLetterImg"
                                style={{
                                    width: "70px",
                                }}
                            />
                            <Text fontSize={"xl"}>
                                보낸 응원 메시지 : {bestCheerMember.cheerMsgCnt}{" "}
                                개
                            </Text>
                        </Box>
                        <Box display={"flex"} alignItems={"center"}>
                            <img
                                src={candyImg}
                                alt="candyImg"
                                style={{
                                    width: "50px",
                                    height: "60px",
                                    marginRight: "1rem",
                                }}
                            />
                            <Text fontSize={"xl"}>
                                보낸 사탕 : {bestCheerMember.candyCnt} 개
                            </Text>
                        </Box>
                    </VStack>
                </Flex>
                <BasicButton buttonName={"다음으로"} onClick={nextContent} />
            </Flex>
        </>
    );
}

export default BestCheerMemberModal;
