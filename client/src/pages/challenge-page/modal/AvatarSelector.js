import { Stack, Box, Avatar } from "@chakra-ui/react";
import { useState } from "react";

import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import { useRecoilState } from "recoil";
import { challengeStatusState } from "contexts/Challenge";
const avatars = [
    { name: "cat1", src: avatar1 },
    { name: "cat2", src: avatar2 },
    { name: "dog1", src: avatar3 },
    { name: "dog2", src: avatar4 },
];

function AvatarSelector() {
    const [currentStatus, setCurrentStatus] = useRecoilState(challengeStatusState); // 선택된 Avatar를 추적하는 상태, 상태에 avatar 키 추가되면 useState 안의 기본 값 수정해야 함

    return (
        <Stack direction="row" className="flex justify-center">
            {avatars.map((avatar, index) => (
                <Box
                    key={avatar.name}
                    bg={currentStatus.imagePath === `avatar${index + 1}.png` ? "dam.yellow" : ""}
                    onClick={() =>
                        setCurrentStatus({
                            imagePath: `avatar${index + 1}.png`,
                        })
                    }
                    className="rounded-full"
                >
                    <Avatar name={avatar.name} src={avatar.src} size="xl" />
                </Box>
            ))}
        </Stack>
    );
}

export default AvatarSelector;
