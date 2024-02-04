import { Text } from "@chakra-ui/react";
import { gatheredMoneyState } from "contexts/TruthRoom";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

function InputComponent(props) {
    const gatheredMoney = useRecoilValue(gatheredMoneyState);
    const [inputValue, setInputValue] = useState(0);

    // 입력 필드 값을 변경하는 함수입니다.
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // 버튼 클릭 시 호출될 함수입니다.
    const handleButtonClick = (percent) => {
        // Recoil 상태의 값을 입력 필드에 설정합니다.
        setInputValue(gatheredMoney * percent);
    };

    return (
        <div className="input-group">
            <div>
                <input
                    className="input-container"
                    value={inputValue}
                    onChange={handleInputChange}
                ></input>
                <Text as="b" fontSize={"20px"}>
                    원
                </Text>
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
