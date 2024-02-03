import { Text } from "@chakra-ui/react";
import React from "react";

function FineItemComponent({ fine, onFineChange, isSelected }) {
    // fine: 벌금 항목 중 하나
    // 벌금 투표 항목에 쓰일 컴포넌트
    return (
        <div>
            <input
                type="radio"
                name="fine"
                value={fine}
                onChange={() => onFineChange(fine)}
                checked={isSelected}
            />
            <Text as="b" fontSize={"25px"}>
                {fine}원
            </Text>
        </div>
    );
}

export default FineItemComponent;
