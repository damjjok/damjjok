import { Text } from "@chakra-ui/react";
import React, { useState } from "react";
import ConfirmButtonComponent from "../../../ConfirmButtonComponent";
import { useRecoilState, useRecoilValue } from "recoil";
import { fineDecisionStepState, inputFineListState } from "contexts/TruthRoom";
import FineItemComponent from "./FineItemComponent";

function VoteComponent(props) {
    const inputFineList = useRecoilValue(inputFineListState);
    const [fineDecisionStep, setFineDecisionStep] = useRecoilState(
        fineDecisionStepState
    );
    const [selectedFine, setSelectedFine] = useState(inputFineList[0]);

    const handleFineChange = (fine) => {
        setSelectedFine(fine); // 선택된 벌금 업데이트
    };

    const handleClickConfrim = () => {
        // 이 단계는 입력의 가장 마지막 단계이므로, fineDecisionInputStep이 아닌 fineDecisionStep을 컨트롤 해줘야 함
        setFineDecisionStep(fineDecisionStep + 1);
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
                    {inputFineList.map((fine) => (
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
