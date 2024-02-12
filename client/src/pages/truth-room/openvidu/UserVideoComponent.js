import React from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";

export default function UserVideoComponent({ streamManager }) {
    const getNicknameTag = () => {
        // Gets the nickName of the user
        return JSON.parse(streamManager.stream.connection.data).clientData.name;
    };

    return (
        <div>
            {streamManager !== undefined ? (
                <div className="streamcomponent" style={{ margin: "10px" }}>
                    <OpenViduVideoComponent streamManager={streamManager} />
                    <div style={{ borderTopLeftRadius: "10px" }}>
                        <p>{getNicknameTag()}</p>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
