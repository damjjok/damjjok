import getMoneyGif from "assets/gifs/getMoney.gif";
import gradeGif from "assets/gifs/grade.gif";
import { Box, HStack } from "@chakra-ui/react";
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
                    w="48"
                    h="48"
                    className="flex flex-col items-center justify-center rounded-3xl border-4 p-8 border-damyellow shadow-xl"
                >
                    <img
                        src={data.gifSrc}
                        alt={data.altText}
                        className="w-20 h-20"
                    />
                    <p className="text-xs text-center font-semibold mt-2">
                        {data.text1}
                    </p>
                    <p className=" text-center font-semibold">{data.text2}</p>
                </Box>
            ))}
        </HStack>
    );
}

export default InfoCards;
