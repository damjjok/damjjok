import getMoneyGif from "assets/gifs/getMoney.gif";
import gradeGif from "assets/gifs/grade.gif";
import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import lv1 from "assets/gifs/lv1blood-pressure.gif";
import lv2 from "assets/gifs/lv2blood-oxygen.gif";
import lv3 from "assets/gifs/lv3beating-heart.gif";
import lv4 from "assets/gifs/lv4neuron-activate.gif";
import lv5 from "assets/gifs/lv5lung.gif";
import lv6 from "assets/gifs/lv6healthlvup.gif";
import lv7 from "assets/gifs/lv7strong-heart.gif";
import lv8 from "assets/gifs/lv8lung-half.gif";
import lv9 from "assets/gifs/lv9lung-perfect.gif";

const levelData = [
    {
        key: 1,
        img: lv1,
        duration: "20분",
        text: "혈압과 맥박이 정상으로 돌아왔어요!",
    },
    {
        key: 2,
        img: lv2,
        duration: "8시간",
        text: "혈중 일산화탄소량이 정상으로 돌아왔어요!",
    },
    {
        key: 3,
        img: lv3,
        duration: "12시간",
        text: "심장마비 위험이 감소해요!",
    },
    {
        key: 4,
        img: lv4,
        duration: "48시간",
        text: "말초신경이 되살아납니다!",
    },
    {
        key: 5,
        img: lv5,
        duration: "2-3주",
        text: "폐기능이 30% 이상 증가했어요!",
    },
    {
        key: 6,
        img: lv6,
        duration: "1-9개월",
        text: "기침, 코막힘, 피로, 호흡곤란이 감소해요!",
    },
    {
        key: 7,
        img: lv7,
        duration: "1년",
        text: "심장마비 위험이 절반으로 줄었어요!",
    },
    {
        key: 8,
        img: lv8,
        duration: "5년",
        text: "폐암으로 사망할 확률이 절반으로 줄었어요!",
    },
    {
        key: 9,
        img: lv9,
        duration: "10년",
        text: "폐암으로 사망할 확률이 비흡연자와 같아요!",
    },
];

const currentLevel = 1;

// Box에 들어갈 데이터 배열
// 박스 내에 세로로 긴 이미지 가로 폭 줄어드는 문제 해결하고 싶음..
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
        gifSrc: levelData[currentLevel - 1].img,
        altText: `"${levelData[currentLevel - 1].img}"`,
        text1: `금연 건강 레벨 ${levelData[currentLevel - 1].key}!`,
        text2: `${levelData[currentLevel - 1].text}`,
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
                    className="flex flex-col items-center justify-center rounded-3xl border-4 p-8 mx-4 border-damyellow transition-shadow hover:shadow-xl"
                >
                    <VStack spacing={2} alignItems="center">
                        <Box w="20" h="20" className="overflow-hidden">
                            <Image
                                src={data.gifSrc}
                                alt={data.altText}
                                boxSize="100%"
                                className=" rounded-xl"
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
