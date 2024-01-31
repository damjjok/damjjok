import React, { useState } from "react";
import BasicButton from "components/button/BasicButton";

function ReadyStateFrame() {
    const [buttonClicked, setButtonClicked] = useState(false);

    function startButtonClick() {
        setButtonClicked(true);
    }
    if (!buttonClicked) {
        // 여기서 쓰이는 버튼들은 일단 BasicButton으로 뒀습니다.
        // 후에 css 정리를 할 때 ui에 맞는 버튼으로의 수정이 필요합니다.
        return (
            <BasicButton
                buttonName={"시작하기"}
                variant={"bigBtn"}
                onClick={startButtonClick}
            />
        );
    } else {
        return (
            <BasicButton
                buttonName={"준비 완료!"}
                variant={"cancel"}
            ></BasicButton>
        );
    }
}

export default ReadyStateFrame;
