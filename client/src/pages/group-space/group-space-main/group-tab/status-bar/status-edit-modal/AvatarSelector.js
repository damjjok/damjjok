import { Stack, Box, Avatar } from "@chakra-ui/react"
import { useState } from 'react'


function AvatarSelector({avatars}) {
  const [selectedAvatar, setSelectedAvatar] = useState(null);  // 선택된 Avatar를 추적하는 상태

  return(
    <Stack direction='row' className="flex justify-center">
    {avatars.map((avatar) => (
      <Box
        key={avatar.name}
        bg={selectedAvatar === avatar.name ? 'dam.yellow' : ''}
        onClick={() => setSelectedAvatar(avatar.name)}
        className='rounded-full'
      >
        <Avatar name={avatar.name} src={avatar.src} size='xl' />
      </Box>
    ))}
  </Stack>

  )
}

export default AvatarSelector