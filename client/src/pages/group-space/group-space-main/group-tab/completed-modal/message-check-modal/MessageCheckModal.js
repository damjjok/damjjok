import { Box, Card, CardBody, CardHeader, Flex, Heading, Modal, ModalBody, ModalContent, ModalOverlay, VStack, useDisclosure } from "@chakra-ui/react"
import BasicButton from "components/button/BasicButton"
import postbox from 'assets/images/postboxMain.png'
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import messageBg from 'assets/images/postboxMain.png'


//더미 데이터
const messages = [
  {writer:'작성자1', content:"안녕잘지내니테스트용으로메시지를길게넣어보려고해"},
  {writer:'작성자2', content:"사실처음봤을때부터...더보기"},
  {writer:'작성자3', content:"이편지는영국에서시작되어..."},
  {writer:'작성자4', content:"메시지 4"},
  {writer:'작성자5', content:"메시지 5"},
  {writer:'작성자6', content:"메시지 6"},
  {writer:'작성자7', content:"메시지 7"},
  {writer:'작성자8', content:"메시지 8"},
  {writer:'작성자9', content:"메시지 9"},
];

function MessageCheckModal({nextContent}) {
  const [isMessagesVisible, setIsMessagesVisible] = useState(false);
  const [displayCount, setDisplayCount] = useState(8);  // 메시지 표시 개수 상태

  const handleClick = () => {
    setIsMessagesVisible(true);}

    const handleMoreClick = () => {
      setDisplayCount(messages.length);  // '더보기' 버튼을 누르면 모든 메시지를 보여주도록 설정
    };

  return (
      <>
        <ModalBody paddingY={20}>
            <VStack position='relative'>
              <p className=" font-extrabold text-4xl text-center py-4">내가 금연 중일 때 어떤 메시지들이 쌓여있었을까요?</p>
              <img src={postbox} alt='postbox' width={'300vw'} onClick={handleClick}/>
              <Box position={'absolute'} top='50%' left='50%' transform="translate(-50%, -50%)" width='90%'>
                <Flex flexWrap='wrap' justifyContent={'center'} >
                  <AnimatePresence>
                  {isMessagesVisible &&
                    messages.slice(0, displayCount).map((message, index) => (
                      <Card 
                      width={'20%'} 
                      marginX='2rem' 
                      marginY='2rem' 
                      backgroundColor={'dam.yellow'} 
                      style={{ 
                        boxShadow: '0 0 20px 10px rgba(255, 255, 255, 0.7)',
                        transition: '0.5s'
                      }}>
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                        >
                          <CardHeader>
                            <Heading size='sm'>
                              {message.writer}
                            </Heading>
                          </CardHeader>
                          <CardBody>
                              {message.content}
                          </CardBody>
                        </motion.div>
                      </Card>
                    ))}
                  </AnimatePresence>
                </Flex>
                {isMessagesVisible &&  // 메시지가 더 있을 경우에만 '더보기' 버튼을 표시
                <p className="text-center" onClick={handleMoreClick}>전체 메시지 보기</p>
                }
                {isMessagesVisible && 
                  <Box display={'flex'} justifyContent={'center'} marginY={4}>
                    <BasicButton buttonName='다음으로'/>
                  </Box>
                }
              </Box>
            </VStack>
        </ModalBody>
      </>
  )
}

export default MessageCheckModal