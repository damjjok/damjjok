import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center flex-start;
    align-items: stretch;
    width: 14vw;
    min-height: 65vh; // 최소 높이 설정
    max-height: 65vh; // 최대 높이 설정
    margin: 0 3vw;
    padding-bottom: 10px;
    border-radius: 20px;
    background-color: #515151;
    overflow-y: scroll;
`;
