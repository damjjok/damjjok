import getMoneyGif from "assets/gifs/getMoney.gif";
import gradeGif from "assets/gifs/grade.gif";
import { Box, Flex, HStack, Image, Select, Text, VStack } from "@chakra-ui/react";
import lv1 from "assets/gifs/lv1blood-pressure.gif";
import lv2 from "assets/gifs/lv2blood-oxygen.gif";
import lv3 from "assets/gifs/lv3beating-heart.gif";
import lv4 from "assets/gifs/lv4neuron-activate.gif";
import lv5 from "assets/gifs/lv5lung.gif";
import lv6 from "assets/gifs/lv6healthlvup.gif";
import lv7 from "assets/gifs/lv7strong-heart.gif";
import lv8 from "assets/gifs/lv8lung-half.gif";
import lv9 from "assets/gifs/lv9lung-perfect.gif";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { challengeState } from "contexts/Challenge";
import { getChallengeRanking } from "apis/api/Challenge";

const levelData = [
    {
        key: 1,
        img: lv1,
        duration: 1200,
        text: "혈압과 맥박이 정상으로 돌아왔어요!",
    },
    {
        key: 2,
        img: lv2,
        duration: 28800,
        text: "혈중 일산화탄소량이 정상으로 돌아왔어요!",
    },
    {
        key: 3,
        img: lv3,
        duration: 43200,
        text: "심장마비 위험이 감소해요!",
    },
    {
        key: 4,
        img: lv4,
        duration: 172800,
        text: "말초신경이 되살아납니다!",
    },
    {
        key: 5,
        img: lv5,
        duration: 1209600,
        text: "폐기능이 30% 이상 증가했어요!",
    },
    {
        key: 6,
        img: lv6,
        duration: 2592000, //
        text: "기침, 코막힘, 피로, 호흡곤란이 감소해요!",
    },
    {
        key: 7,
        img: lv7,
        duration: 31536000,//1년
        text: "심장마비 위험이 절반으로 줄었어요!",
    },
    {
        key: 8,
        img: lv8,
        duration: 157680000, //5년
        text: "폐암으로 사망할 확률이 절반으로 줄었어요!",
    },
    {
        key: 9,
        img: lv9,
        duration: 315360000, //10년
        text: "폐암으로 사망할 확률이 비흡연자와 같아요!",
    },
];

// const currentLevel = 1;

function InfoCards({diffDays, diffMilliseconds, challengeId}) {
    // 셀렉터 감지를 위해
    const [dailyState, setDailyState] = useState(1)
    const [currentLevel, setCurrentLevel] = useState(1)
    const [currentRank, setCurrentRank] = useState(0)
    // console.log(currentLevel);
    useEffect(() => {
        const sortedLevelData = [...levelData].sort((a, b) => b.duration - a.duration);
        const level = sortedLevelData.find((level) => {
          const durationMilliseconds = level.duration * 1000;
          return diffMilliseconds >= durationMilliseconds;
        });
    
        if (level) {
          setCurrentLevel(level?.key);
        }
      }, [diffMilliseconds, levelData, setCurrentLevel]);


    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await getChallengeRanking(challengeId);
            const updatedRank = response.rank
            setCurrentRank(updatedRank); // Recoil 상태에 데이터 적용
            console.log(response);

        } catch (error) {
            console.error("챌린지 정보 불러오기 실패", error);
        }
            };

            fetchData(); // fetchData 함수 호출
        }, 
        [challengeId, setCurrentRank]
        );
    

    return (
        <HStack>
            <Box
                w="60"
                h="60"
                className="flex flex-col items-center justify-center rounded-3xl border-4 p-8 mx-4 border-damyellow transition-shadow hover:shadow-xl"
            >
                <VStack spacing={2} alignItems="center">
                    <Box w="20" h="20" className="overflow-hidden">
                        <Image
                            src={getMoneyGif}
                            alt="getMoneyGif"
                            boxSize="100%"
                            className=" rounded-xl"
                        />
                    </Box>
                    <Box
                        h="4" // 텍스트 박스의 높이를 조절합니다.
                        // className="overflow-hidden"
                    >
                        <Flex alignItems={'center'}>
                            <Text className="text-xs text-center font-semibold">
                                하루
                            </Text>
                            <Select size='xs' borderColor='dam.yellow' width={'50px'} marginX={2}
                                value={dailyState}  // 현재 선택된 값을 표시
                                onChange={(e) => setDailyState(e.target.value)} >
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                            </Select>
                            <Text className="text-xs text-center font-semibold">
                                갑 기준
                            </Text>
                        </Flex>
                    </Box>
                    <Box
                        h="8" // 텍스트 박스의 높이를 조절합니다.
                        className="overflow-visible"
                    >
                        <Text className="text-center font-semibold">
                            {/* 현재 챌린지의 진행 일수도 받아와서 곱해줘야 함 */}
                            {dailyState * 4500 * diffDays} 원을 아꼈어요!
                        </Text>
                    </Box>
                </VStack>
            </Box>
            <Box
                w="60"
                h="60"
                className="flex flex-col items-center justify-center rounded-3xl border-4 p-8 mx-4 border-damyellow transition-shadow hover:shadow-xl"
            >
                <VStack spacing={2} alignItems="center">
                    <Box w="30" h="20" className="overflow-visible">
                        <Image
                            src={gradeGif}
                            alt="gradeGif"
                            boxSize="100%"
                            className=" rounded-xl"
                            objectFit='cover'
                        />
                    </Box>
                    <Box
                        h="4" // 텍스트 박스의 높이를 조절합니다.
                        className="overflow-hidden"
                    >                            
                        <Text className="text-xs text-center font-semibold">
                            전체 챌린저 중
                        </Text>
                    </Box>
                    <Box
                        h="8" // 텍스트 박스의 높이를 조절합니다.
                        className="overflow-visible"
                    >
                        <Text className="text-center font-semibold">
                            상위 { currentRank }%에요!
                        </Text>
                    </Box>
                </VStack>
            </Box>
            <Box
                w="60"
                h="60"
                className="flex flex-col items-center justify-center rounded-3xl border-4 p-8 mx-4 border-damyellow transition-shadow hover:shadow-xl"
            >
                <VStack spacing={2} alignItems="center">
                    <Box w="20" h="20" className="overflow-hidden">
                        <Image
                            src={levelData[currentLevel - 1].img}
                            alt="currentlvimg"
                            boxSize="100%"
                            className=" rounded-xl"
                            objectFit='cover'
                        />
                    </Box>
                    <Box
                        h="4" // 텍스트 박스의 높이를 조절합니다.
                        className="overflow-hidden"
                    >
                        <Text className="text-xs text-center font-semibold">
                            {`금연 건강 레벨 ${levelData[currentLevel - 1].key}!`}
                        </Text>
                    </Box>
                    <Box
                        h="8" // 텍스트 박스의 높이를 조절합니다.
                        className="overflow-visible"
                    >
                        <Text className="text-center font-semibold">
                            {`${levelData[currentLevel - 1].text}`}
                        </Text>
                    </Box>
                </VStack>
            </Box>
        </HStack>
    );
}

export default InfoCards;
