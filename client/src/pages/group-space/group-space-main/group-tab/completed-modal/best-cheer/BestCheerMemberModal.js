import { Box, Flex, ModalBody, Text, VStack } from "@chakra-ui/react"
import BasicButton from "components/button/BasicButton"
import crownImg from 'assets/gifs/crown.gif'
import sendLetterImg from 'assets/gifs/sendLetter.gif'
import candyImg from 'assets/gifs/candy.gif'

//더미 데이터
const currentUser = {
  name: '손종민'
}
const currentGroupMember = [{name: '손종민', role:'damJJok', cheering_message_set: [1, 2, 3, 4], candy_set: [1, 2, 3]}, 
                            {name: '최명성', role:'phD', cheering_message_set: [1, 2, 3, 4, 5], candy_set: [1, 2, 3, 4]}, 
                            { name: '박서현', role:'phD', cheering_message_set: [1, 2, 3, 4], candy_set: [1, 2, 3, 4, 5, 6, 7]},
                            { name: '김다희', role:'phD', cheering_message_set: [1, 2, 3, 4], candy_set: [1, 2, 3]},
                            { name: '김영후', role:'phD', cheering_message_set: [1, 2, 3, 4, 5, 6, 7, 8], candy_set: [1, 2, 3]}, 
                            { name: '문지호', role:'phD', cheering_message_set: [1, 2, 3, 4], candy_set: [1, 2, 3]}]

function BestCheerMemberModal({nextContent}) {
  const bestCheerMember = currentGroupMember.reduce((prev, current) => {
    const prevTotal = prev.cheering_message_set.length + prev.candy_set.length;
    const currentTotal = current.cheering_message_set.length + current.candy_set.length;
    return prevTotal > currentTotal ? prev : current;
  });
  return (
  <>
      <Flex flexFlow={'column'} justifyContent={'center'} alignItems={'center'} marginY={20}>
            {/* <StarIcon boxSize={20} color='dam.yellow'/> */}
            <ModalBody>
              <Flex flexFlow={'column'} alignItems={'center'} marginY={6}>
                <p className=" font-extrabold text-4xl text-center">{ currentUser.name }님의 이번 챌린지 응원왕은...</p>
                <img src={crownImg} alt="crownImg" style={{
                  clipPath: 'inset(0 0 20% 0',
                  width: '200px',
                  height: '200px',
                  objectFit: 'cover',
                }}/>
                <VStack justifyContent={'center'}>
                  <Text fontSize={'3xl'} fontWeight={'bold'}>{bestCheerMember.name}님 입니다!!</Text>
                  <Box display={'flex'} alignItems={'center'}>
                    <img src={sendLetterImg} alt='sendLetterImg'style={{
                      width: '70px'
                    }}/>
                    <Text fontSize={'xl'}>보낸 응원 메시지 : {bestCheerMember.cheering_message_set.length} 개</Text>
                  </Box>
                  <Box display={'flex'} alignItems={'center'}>
                    <img src={candyImg} alt='candyImg' style={{
                      width: '50px',
                      height: '60px',
                      marginRight: '1rem'
                    }}/>
                    <Text fontSize={'xl'}>보낸 사탕 : {bestCheerMember.candy_set.length} 개</Text>
                  </Box>
                </VStack>
              </Flex>
            </ModalBody>
            <BasicButton buttonName={'다음으로'} onClick={nextContent}/>
        </Flex>
  </>
  )
}

export default BestCheerMemberModal