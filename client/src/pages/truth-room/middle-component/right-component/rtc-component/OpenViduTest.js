import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./OpenViduTest.css";
import UserVideoComponent from "../../../openvidu/UserVideoComponent";
import { closeOpenviduSession } from "apis/api/TruthRoom";
import { useRecoilState, useRecoilValue } from "recoil";
import { sessionKeyState, userNameState } from "contexts/OpenVidu";
import { Wrapper } from "./RtcComponent.style";
import RtcFrameComponent from "./RtcFrameComponent";

const APPLICATION_SERVER_URL =
    process.env.NODE_ENV === "production" ? "" : "https://i10e105.p.ssafy.io/";

export default function OpenViduTest() {
    const [sessionKey, setSessionKey] = useRecoilState(sessionKeyState);
    const userName = useRecoilValue(userNameState);
    const [session, setSession] = useState(undefined);
    const [publisher, setPublisher] = useState(undefined);
    const [subscribers, setSubscribers] = useState([]);
    const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

    const OV = useRef(new OpenVidu());

    const joinSession = useCallback(() => {
        const mySession = OV.current.initSession();

        mySession.on("streamCreated", (event) => {
            const subscriber = mySession.subscribe(event.stream, undefined);
            setSubscribers((subscribers) => [...subscribers, subscriber]);
        });

        mySession.on("streamDestroyed", (event) => {
            deleteSubscriber(event.stream.streamManager);
        });

        mySession.on("exception", (exception) => {
            console.warn(exception);
        });

        setSession(mySession);
    }, []);

    useEffect(() => {
        if (session) {
            // Get a token from the OpenVidu deployment
            getToken().then(async (token) => {
                try {
                    await session.connect(token, { clientData: userName });

                    let publisher = await OV.current.initPublisherAsync(
                        undefined,
                        {
                            audioSource: undefined,
                            videoSource: undefined,
                            publishAudio: true,
                            publishVideo: true,
                            resolution: "640x480",
                            frameRate: 30,
                            insertMode: "APPEND",
                            mirror: false,
                        }
                    );

                    session.publish(publisher);

                    const devices = await OV.current.getDevices();
                    const videoDevices = devices.filter(
                        (device) => device.kind === "videoinput"
                    );
                    const currentVideoDeviceId = publisher.stream
                        .getMediaStream()
                        .getVideoTracks()[0]
                        .getSettings().deviceId;
                    const currentVideoDevice = videoDevices.find(
                        (device) => device.deviceId === currentVideoDeviceId
                    );

                    setPublisher(publisher);
                    setCurrentVideoDevice(currentVideoDevice);
                } catch (error) {
                    console.log(
                        "There was an error connecting to the session:",
                        error.code,
                        error.message
                    );
                }
            });
        }
    }, [session]);

    const leaveSession = useCallback(() => {
        // Leave the session
        if (session) {
            closeOpenviduSession(sessionKey);
            session.disconnect();
        }

        // Reset all states and OpenVidu object
        OV.current = new OpenVidu();
        setSession(undefined);
        setSubscribers([]);
        setSessionKey("0");
        setPublisher(undefined);
    }, [session]);

    const deleteSubscriber = useCallback((streamManager) => {
        setSubscribers((prevSubscribers) => {
            const index = prevSubscribers.indexOf(streamManager);
            if (index > -1) {
                const newSubscribers = [...prevSubscribers];
                newSubscribers.splice(index, 1);
                return newSubscribers;
            } else {
                return prevSubscribers;
            }
        });
    }, []);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            leaveSession();
        };
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [leaveSession]);

    /**
     * --------------------------------------------
     * GETTING A TOKEN FROM YOUR APPLICATION SERVER
     * --------------------------------------------
     * The methods below request the creation of a Session and a Token to
     * your application server. This keeps your OpenVidu deployment secure.
     *
     * In this sample code, there is no user control at all. Anybody could
     * access your application server endpoints! In a real production
     * environment, your application server must identify the user to allow
     * access to the endpoints.
     *
     * Visit https://docs.openvidu.io/en/stable/application-server to learn
     * more about the integration of OpenVidu in your application server.
     */
    const getToken = useCallback(async () => {
        return createSession().then((sessionId) => createToken(sessionId));
    }, [sessionKey]);

    const createSession = async () => {
        const response = await axios.post(
            APPLICATION_SERVER_URL + "api/v1/sessions",
            { sessionKey: sessionKey }
        );
        return response.data; // The sessionId
    };

    const createToken = async (sessionId) => {
        const response = await axios.post(
            APPLICATION_SERVER_URL +
                "api/v1/sessions/" +
                sessionId +
                "/connections"
        );
        return response.data.token; // The token
    };
    return (
        <div className="container">
            <div id="session">
                <div id="video-container" className="col-md-6">
                    <Wrapper>
                        {publisher !== undefined ? ( // 본인 화면
                            <RtcFrameComponent
                                content={
                                    <UserVideoComponent
                                        streamManager={publisher}
                                    />
                                }
                            ></RtcFrameComponent>
                        ) : null}
                        {subscribers.map(
                            (
                                sub,
                                i // 나머지 참가자들 화면
                            ) => (
                                <RtcFrameComponent
                                    content={
                                        <UserVideoComponent
                                            streamManager={sub}
                                        />
                                    }
                                ></RtcFrameComponent>
                            )
                        )}
                    </Wrapper>
                </div>
                <div id="session-header">
                    {session === undefined ? (
                        <div id="join">
                            <div id="join-dialog" className="jumbotron">
                                <form
                                    className="form-group"
                                    onSubmit={joinSession}
                                >
                                    <p className="text-center">
                                        <input
                                            className="btn"
                                            name="commit"
                                            type="submit"
                                            value="화상 카메라 연결"
                                        />
                                    </p>
                                </form>
                            </div>
                        </div>
                    ) : null}
                    {session !== undefined ? (
                        <input
                            className="btn btn-large btn-danger"
                            type="button"
                            id="buttonLeaveSession"
                            onClick={leaveSession}
                            value="Leave session"
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
}
