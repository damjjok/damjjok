import styled from "styled-components";

export const Wrapper = styled.div`
    .title-container {
        margin: 30px;
    }
    .question-container {
        margin-top: 40px;
        margin-bottom: 40px;
    }
    .input-container {
        border: none;
        border-bottom: 2px solid black;
        outline: none;
        padding: 5px;
        margin-right: 5px;
        text-align: right;
        font-size: 20px;
        font-weight: bold;
    }

    .input-container:focus {
        outline: none;
    }
`;
