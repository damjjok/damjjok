import { useToast } from "@chakra-ui/react"
import BasicButton from "components/button/BasicButton"
import { currentUserState } from "contexts/User"
import { useRecoilValue } from "recoil"


function StatusBarToast() {
  const toast = useToast({
    containerStyle: {
      bgColor: 'yellow'
    }
  })
  const currentUser = useRecoilValue(currentUserState)
  return (
    <BasicButton
      onClick={currentUser.role === 'damJJok' ? () =>
        toast({
          title: '출석 완료!',
          description: "오늘의 금연도 화이팅이에요!",
          status: 'success',
          duration: 9000,
          isClosable: true,
        }) : () => toast({
          title: '응원 완료!',
          description: `담쪽이 님을 응원했어요!`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
      variant={'smbtn'}
      buttonName={currentUser.role === 'damJJok' ? '출석하기' : '응원하기' }

    >
    </BasicButton>
  )
}

export default StatusBarToast