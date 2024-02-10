import { StarIcon } from "@chakra-ui/icons";
import { Flex, ModalBody, VStack } from "@chakra-ui/react";
import { getCheerMessageList } from "apis/api/CheerMsg";
import BasicButton from "components/button/BasicButton";
import { challengeCheerMessageList, challengeState } from "contexts/Challenge";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

function ChallengeCompletedModal({ nextContent }) {
    const challenge = useRecoilValue(challengeState);
    const [cheerMessageList, setCheerMessageList] = useRecoilState(
        challengeCheerMessageList
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCheerMessageList(
                    challenge.challengeId
                );
                setCheerMessageList(response);
                console.log(cheerMessageList);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Flex
                flexFlow={"column"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <ModalBody>
                    <VStack spacing={"20px"}>
                        <StarIcon boxSize={20} color="dam.yellow" />
                        <p className=" font-extrabold text-4xl text-center">
                            축하해요! 챌린지 도전에 성공했어요!
                        </p>
                        <p className="font-semibold text-center">
                            성공한 챌린지의 리포트를 확인할 수 있어요!
                        </p>
                        <BasicButton
                            buttonName={"리포트 확인하기"}
                            variant={"bigbtn"}
                            onClick={() => {
                                nextContent();
                            }}
                        />
                    </VStack>
                </ModalBody>
            </Flex>
        </>
    );
}

export default ChallengeCompletedModal;
