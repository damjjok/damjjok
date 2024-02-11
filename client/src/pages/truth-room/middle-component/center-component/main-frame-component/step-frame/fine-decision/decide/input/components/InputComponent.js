import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import { gatheredMoneyState } from "contexts/TruthRoom";
import { inputFineState } from "contexts/TruthRoomSocket";
import { useRecoilState, useRecoilValue } from "recoil";

function InputComponent(props) {
    const gatheredMoney = useRecoilValue(gatheredMoneyState);
    const [inputValue, setInputValue] = useRecoilState(inputFineState);
    const [errorMessage, setErrorMessage] = useState(""); // 범위 벗어난 값 입력 시 띄워 줄 오류 메시지

    // 입력 필드 값을 변경하는 함수입니다.
    const handleInputChange = (event) => {
        let inputFine = event.target.value;
        if (inputFine < 0) {
            setErrorMessage("0원 이하의 금액은 벌금으로 설정할 수 없어요!");
            // setInputValue(0);
        } else if (inputFine > gatheredMoney) {
            setErrorMessage(
                "이때까지 모인 금액(" +
                    gatheredMoney +
                    "원) 이하의 값만 벌금으로 설정할 수 있어요!"
            );
            // setInputValue(gatheredMoney);
        } else {
            setInputValue(inputFine);
            setErrorMessage("");
        }
    };

    // 버튼 클릭 시 호출될 함수입니다.
    const handleButtonClick = (percent) => {
        // Recoil 상태의 값을 입력 필드에 설정합니다.
        setInputValue(gatheredMoney * percent);
        setErrorMessage("");
    };

    return (
        <div className="input-group">
            <div>
                <input
                    className="input-container"
                    type="number"
                    value={inputValue}
                    min={0}
                    max={gatheredMoney}
                    onChange={handleInputChange}
                ></input>
                <Text as="b" fontSize={"20px"}>
                    원
                </Text>
                {errorMessage && (
                    <Text color="red" mt={2}>
                        {errorMessage}
                    </Text>
                )}
            </div>
            <div className="percent-button-container">
                <button
                    className="percent-button"
                    onClick={() => handleButtonClick(0.2)}
                >
                    20%
                </button>
                <button
                    className="percent-button"
                    onClick={() => handleButtonClick(0.4)}
                >
                    40%
                </button>
                <button
                    className="percent-button"
                    onClick={() => handleButtonClick(0.6)}
                >
                    60%
                </button>
                <button
                    className="percent-button"
                    onClick={() => handleButtonClick(0.8)}
                >
                    80%
                </button>
            </div>
        </div>
    );
}

export default InputComponent;
