import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { WebSocketContext } from "contexts/WebSocketContext";

const ConnectionButton = () => {
    const { connect, disconnect, isConnected } = useContext(WebSocketContext);

    return (
        <div>
            <Button onClick={isConnected ? disconnect : connect}>
                {isConnected ? "Disconnect" : "Connect"}
            </Button>
        </div>
    );
};

export default ConnectionButton;
