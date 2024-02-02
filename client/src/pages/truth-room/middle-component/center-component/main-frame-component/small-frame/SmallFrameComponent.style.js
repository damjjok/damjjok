import styled from "styled-components";

export const Wrapper = styled.div`
    border-radius: 30px;
    background-color: white;
    width: ${(props) => `${props.width}px` || `942px`};
    height: ${(props) => `${props.height}px` || `447px`};
`;
