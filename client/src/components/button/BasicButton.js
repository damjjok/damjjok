import { ButtonContainer } from "./BasicButton.style";

const BasicButton = ({ style, buttonName, onClick, variant, isDisabled }) => {
    return (
        <>
            <ButtonContainer
                style={style}
                onClick={onClick}
                variant={variant}
                disabled={isDisabled}
            >
                <div className="text">{buttonName}</div>
            </ButtonContainer>
        </>
    );
};
export default BasicButton;
