import getMoneyGif from "assets/gifs/getMoney.gif";
import gradeGif from "assets/gifs/grade.gif";
import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import lv3 from "assets/gifs/lv3beating-heart.gif";

// Box에 들어갈 데이터 배열
const boxData = [
    {
        gifSrc: getMoneyGif,
        altText: "getMoneyGif",
        text1: "하루 1갑 기준",
        text2: "4500원을 아꼈어요!",
    },
    {
        gifSrc: gradeGif,
        altText: "gradeGif",
        text1: "전체 챌린저 중",
        text2: "상위 n%에요!",
    },
    {
        gifSrc: lv3,
        altText: "lv3",
        text1: "금연 건강 레벨 3!",
        text2: "심장마비 위험이 감소해요",
    },
];

function InfoCards() {
    return (
        <HStack>
            {boxData.map((data, index) => (
                <Box
                    key={index}
                    w="60"
                    h="60"
                    className="flex flex-col items-center justify-center rounded-3xl border-4 p-8 mx-4 border-damyellow shadow-xl"
                >
                    <VStack spacing={2} alignItems="center">
                        <Box w="20" h="20" className="overflow-hidden">
                            <Image
                                src={data.gifSrc}
                                alt={data.altText}
                                boxSize="100%"
                            />
                        </Box>
                        <Box
                            h="4" // 텍스트 박스의 높이를 조절합니다.
                            className="overflow-hidden"
                        >
                            <Text className="text-xs text-center font-semibold">
                                {data.text1}
                            </Text>
                        </Box>
                        <Box
                            h="8" // 텍스트 박스의 높이를 조절합니다.
                            className="overflow-visible"
                        >
                            <Text className="text-center font-semibold">
                                {data.text2}
                            </Text>
                        </Box>
                    </VStack>
                </Box>
            ))}
        </HStack>
    );
}

export default InfoCards;
