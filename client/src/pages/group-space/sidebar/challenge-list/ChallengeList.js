import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { challengeListState } from "../../../../context/Challenge";

function ChallengeList() {
  const challengeList = useRecoilValue(challengeListState);
  return (
      <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
              <h2>
                  <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                          <p className=" font-bold">진행중인 챌린지</p>
                      </Box>
                      <AccordionIcon />
                  </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                  <ul>
                      <li className=" py-2 px-2 rounded-full hover:bg-damyellow">
                          <p className="text-sm font-medium">챌린지</p>
                      </li>
                      <li>박싸피님의 챌린지</li>
                  </ul>
              </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
              <h2>
                  <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                          <p className=" font-bold">지난 챌린지</p>
                      </Box>
                      <AccordionIcon />
                  </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                  <ul>
                      <li>지난 챌린지 (성공)</li>
                      <li>지난 챌린지 (실패)</li>
                  </ul>
              </AccordionPanel>
          </AccordionItem>
      </Accordion>
  );
}

export default ChallengeList;
