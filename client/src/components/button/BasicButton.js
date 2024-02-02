import { ButtonContainer } from "./BasicButton.style";

const BasicButton = ({ buttonName, onClick, variant, isDisabled }) => {
    return (
        <>
            <ButtonContainer onClick={onClick} variant={variant} disabled={isDisabled}>
                <div className="text">{buttonName}</div>
            </ButtonContainer>
        </>
    );
};
export default BasicButton;
