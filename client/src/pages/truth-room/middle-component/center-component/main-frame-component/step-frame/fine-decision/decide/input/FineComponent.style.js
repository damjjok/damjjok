import styled from "styled-components";

export const Wrapper = styled.div`
    .title-container {
        margin: 30px;
    }
    .question-container {
        margin-top: 40px;
        margin-bottom: 40px;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px; // 입력 필드와 버튼 컨테이너 사이의 간격
    }

    .input-container {
        border: none;
        border-bottom: 2px solid black;
        outline: none;
        padding: 5px;
        width: 238px;
        margin-right: 5px;
        text-align: right;
        font-size: 20px;
        font-weight: bold;
    }

    .input-container:focus {
        outline: none;
    }

    .percent-button-container {
        display: flex;
        justify-content: space-around;
        width: 238px;
    }

    .percent-button {
        background-color: #d9d9d9;
        font-weight: bold;
        padding: 3px;
        margin: 5px;
    }

    .custom-radio-button {
        display: inline-block;
        padding: 5px;
    }

    .radio-inner {
        display: inline-block;
        width: 24px;
        height: 24px;
        border: 2px solid #000;
        border-radius: 4px; /* 사각형 모양을 원한다면 이 값을 0으로 설정합니다. */
        margin-right: 10px;
        vertical-align: middle;
        cursor: pointer;
    }

    .radio-inner.selected {
        background-color: #000; /* 선택됐을 때의 색상을 설정합니다. */
    }
`;
