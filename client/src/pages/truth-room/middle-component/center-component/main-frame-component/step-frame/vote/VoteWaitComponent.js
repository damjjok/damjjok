import React from "react";

function VoteWaitComponent(props) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <div style={{ margin: "10px", textAlign: "center" }}>
                다른 사람들의 투표를 기다리고 있어요...
            </div>
            <div style={{ margin: "10px", textAlign: "center" }}> 2 / 4</div>
        </div>
    );
}

export default VoteWaitComponent;
