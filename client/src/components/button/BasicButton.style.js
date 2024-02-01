import styled, { css } from "styled-components";

export const ButtonContainer = styled.button`
    display: flex;
    width: 120px;
    height: 40px;
    background-color: #ffd100;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 50px;

    ${(props) =>
        props.variant === "cancel" &&
        css`
            background-color: #d6d6d6;
        `}
    ${(props) =>
        props.variant === "bigbtn" &&
        css`
            width: 240px;
        `}

    .text {
        color: #121212;

        text-align: center;
        font-family: "Noto Sans KR";
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    ${(props) =>
        props.variant === "smbtn" &&
        css`
            width: 60px;
            height: 20px;
            .text {
                font-size: 10px;
            }
        `}

    ${(props) =>
        props.disabled &&
        css`
            opacity: 50;
            cursor: not-allowed;
        `}
`;
