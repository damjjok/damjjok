import { StarIcon } from "@chakra-ui/icons";
import { Flex, ModalBody, VStack } from "@chakra-ui/react";
import BasicButton from "components/button/BasicButton";

function ChallengeCompletedModal({ nextContent }) {
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
                            onClick={nextContent}
                        />
                    </VStack>
                </ModalBody>
            </Flex>
        </>
    );
}

export default ChallengeCompletedModal;
