import React from "react";
import checkImg from "assets/images/penalty-check.png";

function CheckImageComponent(props) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <img
                src={checkImg}
                alt="체크"
                style={{
                    marginTop: "50px",
                    width: "70px",
                    height: "70px",
                }}
            ></img>
        </div>
    );
}

export default CheckImageComponent;
