import { ButtonContainer } from "./BasicButton.style";

const BasicButton = ({ buttonName, onClick, variant }) => {
    return (
        <>
            <ButtonContainer onClick={onClick} variant={variant}>
                <div className="text">{buttonName}</div>
            </ButtonContainer>
        </>
    );
};
export default BasicButton;
