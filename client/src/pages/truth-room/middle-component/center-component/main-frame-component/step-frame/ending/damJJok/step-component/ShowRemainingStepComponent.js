import { Button, Text } from "@chakra-ui/react";
import { gatheredMoneyState } from "contexts/TruthRoom";
import {
    fineDeterminedState,
    joinMemberListState,
} from "contexts/TruthRoomSocket";
import React from "react";
import { useRecoilValue } from "recoil";

function ShowRemainingStepComponent({ onClick }) {
    const gatheredMoney = useRecoilValue(gatheredMoneyState);
    const joinMemberList = useRecoilValue(joinMemberListState);
    const fineDetermined = useRecoilValue(fineDeterminedState);
    // 잔여 적립금 화면
    return (
        <div>
            <div style={{ margin: "100px", textAlign: "center" }}>
                <Text as="b" fontSize={40}>
                    박사님들에게 {fineDetermined / (joinMemberList.length - 1)}
                    원이 나누어졌고 <p />
                    잔여 적립금은 {gatheredMoney - fineDetermined}원이예요!
                </Text>
            </div>
            <div style={{ margin: "20px", textAlign: "center" }}>
                <Button colorScheme={"facebook"} size={"lg"} onClick={onClick}>
                    나가기
                </Button>
            </div>
        </div>
    );
}

export default ShowRemainingStepComponent;
