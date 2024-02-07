import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { WebSocketContext } from "contexts/WebSocketContext";

const ConnectionButton = () => {
    const { connect, disconnect, isConnected, enterRoom } =
        useContext(WebSocketContext);

    return (
        <div>
            <Button onClick={isConnected ? disconnect : connect}>
                {isConnected ? "Disconnect" : "Connect"}
            </Button>
            <Button onClick={() => enterRoom(1, "김영후", "담쪽이")}>
                방 입장
            </Button>
            <Button>준비하기</Button>
        </div>
    );
};

export default ConnectionButton;
