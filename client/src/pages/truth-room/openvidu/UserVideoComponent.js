import React from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";

export default function UserVideoComponent({ streamManager }) {
    const getNicknameTag = () => {
        // Gets the nickName of the user
        return JSON.parse(streamManager.stream.connection.data).clientData;
    };

    return (
        <div>
            {streamManager !== undefined ? (
                <div className="streamcomponent" style={{ margin: "10px" }}>
                    <OpenViduVideoComponent streamManager={streamManager} />
                    <div id="nick-name-tag">{getNicknameTag()}</div>
                </div>
            ) : null}
        </div>
    );
}
