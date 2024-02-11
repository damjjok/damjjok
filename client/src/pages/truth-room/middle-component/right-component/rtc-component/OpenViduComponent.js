import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./OpenViduComponent.css";
import UserVideoComponent from "../../../openvidu/UserVideoComponent";
import { closeOpenviduSession } from "apis/api/TruthRoom";
import { useRecoilState, useRecoilValue } from "recoil";
import { sessionKeyState, userNameState } from "contexts/OpenVidu";
import { Wrapper } from "./RtcComponent.style";
import { enteringTruthRoomMemberInfoState } from "contexts/TruthRoomSocket";

const APPLICATION_SERVER_URL = "https://i10e105.p.ssafy.io/";

export default function OpenViduComponent() {
    const [sessionKey, setSessionKey] = useRecoilState(sessionKeyState);
    const enteringTruthRoomMemberInfo = useRecoilValue(
        enteringTruthRoomMemberInfoState
    );
    const [session, setSession] = useState(undefined);
    const [publisher, setPublisher] = useState(undefined);
    const [subscribers, setSubscribers] = useState([]);
    const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

    const [connectedMemberList, setConnectedMemberList] = useState([]); // 우리 서비스 기준 순서로 화면에 멤버들 띄워줄 때 사용할 리스트
    const [damJJok, setDamJJok] = useState(undefined); // 담쪽이 설정(화면 가장 위에 띄워줘야 하므로)

    const OV = useRef(new OpenVidu());

    const joinSession = useCallback(() => {
        const mySession = OV.current.initSession();

        mySession.on("streamCreated", (event) => {
            // 멤버가 스트림에 들어올 때마다 담쪽이인지 아닌지 분간
            const subscriber = mySession.subscribe(event.stream, undefined);
            // setSubscribers((subscribers) => [...subscribers, subscriber]);
            if (damJJok !== undefined)
                // 현재 담쪽이가 설정돼있다면 기존 리스트에 새로운 subscriber만 추가
                setConnectedMemberList((connectedMemberList) => [
                    ...connectedMemberList,
                    subscriber,
                ]);
            else {
                // 담쪽이가 설정되지 않았다면
                if (
                    JSON.parse(subscriber.stream.connection.data).clientData
                        .role === "Damjjok"
                )
                    setDamJJok(subscriber);
                else
                    setConnectedMemberList((connectedMemberList) => [
                        ...connectedMemberList,
                        subscriber,
                    ]);
            }
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
                    await session.connect(token, {
                        clientData: enteringTruthRoomMemberInfo,
                    });

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
                    if (enteringTruthRoomMemberInfo.role === "Damjjok")
                        // 입장한 본인이 담쪽이인 경우를 위한 set 로직
                        setDamJJok(publisher);
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
            closeOpenviduSession(sessionKey); // 지금은 테스트라 여기 뒀지만 나중에는 소켓에서 마지막 남은 사람이 나갈 때 실행됨.
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
                        {damJJok !== undefined ? ( // 담쪽이 화면
                            <UserVideoComponent streamManager={damJJok} />
                        ) : null}
                        {publisher !== undefined && publisher !== damJJok ? ( // 본인 화면
                            <UserVideoComponent streamManager={publisher} />
                        ) : null}
                        {connectedMemberList.map(
                            (
                                mem,
                                i // 나머지 멤버들 화면
                            ) => (
                                <UserVideoComponent streamManager={mem} />
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
