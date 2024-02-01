import styled from "styled-components";

export const Wrapper = styled.div`
    width: 460px;
    height: 552px;
    border: 1px solid black;

    .title-container {
        margin: 20px;
        padding: 10px;
    }

    .writer-container {
        display: flex;
        margin: 20px;
        justify-content: right;
    }

    .content-container {
        margin: 20px;
        padding: 10px;
        height: 400px;
        border: 1px solid black;
    }
`;
