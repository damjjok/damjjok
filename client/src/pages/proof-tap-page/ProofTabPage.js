import TitleText from "components/TitleText";
import Evidence from "./evidence/Evidence";
import Testimony from "./testimony/Testimony";
import { Box, VStack, Wrap } from "@chakra-ui/react";

function ProofTabPage() {
    return (
        <Box height={"50vh"} mt={5}>
            <Box>
                {/* <Wrap width="100%" padding={"1rem"} borderRadius={"20px"}>
                    <TitleText fontSize="2rem" description="담쪽이가 흡연하는 장면을 목격했다면 증거를 제출해주세요!">
                        제보게시판
                    </TitleText>
                </Wrap> */}
            </Box>
            <VStack align="stretch">
                <Testimony />
                <hr></hr>
                <Evidence />
            </VStack>
        </Box>
    );
}

export default ProofTabPage;
