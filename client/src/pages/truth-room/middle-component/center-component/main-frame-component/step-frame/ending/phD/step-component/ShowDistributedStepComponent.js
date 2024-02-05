import { Button, Text } from "@chakra-ui/react";
import { decidedFineState, groupState } from "contexts/TruthRoom";
import React from "react";
import { useRecoilValue } from "recoil";

function ShowDistributedStepComponent(props) {
    const group = useRecoilValue(groupState);
    const decidedFine = useRecoilValue(decidedFineState);

    return (
        <div>
            <div style={{ marginTop: "100px", textAlign: "center" }}>
                <Text as="b" fontSize={50}>
                    {decidedFine / (group.length - 1)}원이 <p />
                    박사님들에게 나누어졌어요!
                </Text>
            </div>
            <div style={{ marginTop: "50px", textAlign: "center" }}>
                <Button colorScheme={"facebook"} size={"lg"}>
                    나가기
                </Button>
            </div>
        </div>
    );
}

export default ShowDistributedStepComponent;
