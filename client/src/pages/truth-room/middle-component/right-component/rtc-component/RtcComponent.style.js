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
    padding-left: 8px; // 스크롤바와 맞추기 위해 왼쪽에 패딩 적용
    padding-bottom: 10px;
    border-radius: 20px;
    background-color: #515151;
    overflow-y: scroll;
    box-shadow: 8px 8px rgba(0, 0, 0, 0.1);
`;
