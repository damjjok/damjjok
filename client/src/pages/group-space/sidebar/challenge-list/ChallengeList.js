import { CheckCircleIcon, NotAllowedIcon, PlusSquareIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Circle,
} from "@chakra-ui/react";
import { useState } from "react";
// import { useRecoilValue } from "recoil";
// import { challengeListState } from "../../../../context/Challenge";

//더미데이터
const currentGroupChallengeList = [{ username : '손종민', createdAt : '2024.02.02'}, { username : '김싸피', createdAt : '2023.12.01'}]
// const currentGroupChallengeList = []
const lastChallenge = [{ username : '손종민', createdAt : '2023.11.01', status : 'success'}, {username : '손종민', createdAt : '2023.10.01', status: 'failed'}]

function ChallengeList() {
  // challengeList 반복문 돌릴 예정, 아직은 안 씀.
  // const challengeList = useRecoilValue(challengeListState);
  //선택된 챌린지 표시를 위한 상태
  const [selectedChallenge, setSelectedChallenge] = useState({ index: null, list: null });

  return (
      <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
              <h2>
                  <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                          <p className=" text-lg font-bold">진행중인 챌린지</p>
                      </Box>
                      <AccordionIcon />
                  </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
              <ul>
            {currentGroupChallengeList.length > 0 ? (currentGroupChallengeList.map((challenge, index) => (
                <Flex 
                alignItems="center"
                className={`py-2 px-4 rounded-lg ${selectedChallenge.index === index && selectedChallenge.list === 'current' ? 'bg-[rgba(255,209,0,0.5)]' : 'hover:bg-damyellow'} hover:cursor-pointer`}
                onClick={() => setSelectedChallenge({index, list: 'current'})}>
                    <Circle size="2" bg="green.500" mr="2" />
                    <li key={index}>
                        <p className=" font-semibold">{challenge.username} 챌린지</p>
                        <p className="text-xs">{challenge.createdAt} 시작</p>
                    </li>
                </Flex>
                // 해당 챌린지 페이지로 향하는 링크 추가해야함.
            ))) : (
            <Box>
                <p className="text-xs text-gray-400 mb-2">활성화된 챌린지가 없습니다</p>
                <Flex alignItems='center' cursor='pointer'>
                {/* 생성하기 화면으로 가는 링크 추가해줄 것 */}
                    <PlusSquareIcon marginRight='4px'/>
                    <p>챌린지 생성하기</p>
                </Flex>
            </Box>
            )}
          </ul>
              </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
              <h2>
                  <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                          <p className="text-lg font-bold">지난 챌린지</p>
                      </Box>
                      <AccordionIcon />
                  </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
              <ul>
            {lastChallenge.length > 0 ? (lastChallenge.map((challenge, index) => (
                <Flex 
                alignItems="center"
                className={`py-2 px-4 rounded-lg ${selectedChallenge.index === index && selectedChallenge.list === 'last' ? 'bg-[rgba(255,209,0,0.5)]' : 'hover:bg-damyellow'} hover:cursor-pointer`}
                onClick={() => setSelectedChallenge({index, list:'last'})}>
                    {challenge.status === 'success' ? (                    
                        <CheckCircleIcon size="4" color="green.500" mr="2" />
                    ) : (
                        <WarningIcon size="4" color="dam.gray" mr="2"/>
                    )}

                    <li key={index}>
                        <p className=" font-semibold">{challenge.username} 챌린지</p>
                        <p className="text-xs">{challenge.createdAt} 진행</p>
                    </li>
                </Flex>
                // 해당 챌린지 페이지로 향하는 링크 추가해야함.
            ))) : (
                <p className="text-xs text-gray-400 mb-2">지난 챌린지가 없습니다</p>
            )}
          </ul>
              </AccordionPanel>
          </AccordionItem>
      </Accordion>
  );
}

export default ChallengeList;
