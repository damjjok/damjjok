import { Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import ConfirmButtonComponent from "../../../ConfirmButtonComponent";
import { useRecoilState, useRecoilValue } from "recoil";
import { fineDecisionStepState } from "contexts/TruthRoom";
import FineItemComponent from "./FineItemComponent";
import { challengeIdState, fineVoteListState } from "contexts/TruthRoomSocket";
import { WebSocketContext } from "contexts/WebSocketContext";

function VoteComponent(props) {
    const { voteFine } = useContext(WebSocketContext);
    const fineVoteList = useRecoilValue(fineVoteListState);
    const challengeId = useRecoilValue(challengeIdState);

    const [selectedFine, setSelectedFine] = useState(fineVoteList[0]); // 디폴트로 선택값 주기 위해 변수 선언
    const handleFineChange = (fine) => {
        setSelectedFine(fine); // 선택된 벌금 업데이트
    };

    const handleClickConfrim = () => {
        // 투표 시 소켓에 투표함을 알림
        voteFine(challengeId, selectedFine);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <div className="title-container">
                <Text as="b" fontSize={"35px"}>
                    벌금 결정
                </Text>
                <div
                    style={{
                        marginTop: "30px",
                        height: "120px",
                        overflowY: "auto",
                    }}
                >
                    {fineVoteList.map((fine) => (
                        <FineItemComponent
                            fine={fine}
                            onFineChange={handleFineChange}
                            isSelected={selectedFine === fine}
                        />
                    ))}
                </div>
                <ConfirmButtonComponent
                    margin={50}
                    onClick={handleClickConfrim}
                />
            </div>
        </div>
    );
}

export default VoteComponent;
