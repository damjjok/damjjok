import BasicButton from "components/button/BasicButton";
import React from "react";

function ConfirmButtonComponent({ margin }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "right",
                marginTop: `${margin}px`,
                width: "600px",
            }}
        >
            <BasicButton buttonName={"확인"}></BasicButton>
        </div>
    );
}

export default ConfirmButtonComponent;
