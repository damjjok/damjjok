import { Text } from "@chakra-ui/react";
import React from "react";

function FineItemComponent({ fine, onFineChange, isSelected }) {
    // fine: 벌금 항목 중 하나
    // 벌금 투표 항목에 쓰일 컴포넌트
    return (
        <div>
            <label className="custom-radio-button">
                <input
                    type="radio"
                    name="fine"
                    value={fine}
                    onChange={() => onFineChange(fine)}
                    checked={isSelected}
                    style={{ display: "none" }} // 기본 라디오 버튼을 숨깁니다.
                />
                <span
                    className={
                        isSelected ? "radio-inner selected" : "radio-inner"
                    }
                ></span>
            </label>
            <Text as="b" fontSize={"25px"}>
                {fine}원
            </Text>
        </div>
    );
}

export default FineItemComponent;
