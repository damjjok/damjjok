import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    border-radius: 30px;
    background-color: white;
    width: ${(props) => props.width || 942}px;
    height: ${(props) => props.height || 447}px;
`;
