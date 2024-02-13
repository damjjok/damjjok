import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./OpenViduComponent.css";
import UserVideoComponent from "../../../openvidu/UserVideoComponent";
import { closeOpenviduSession } from "apis/api/TruthRoom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Wrapper } from "./RtcComponent.style";
import {
    challengeIdState,
    enteringTruthRoomMemberInfoState,
    stepState,
} from "contexts/TruthRoomSocket";
import { finalArgumentDamJJokState } from "contexts/TruthRoom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import BasicButton from "components/button/BasicButton";

const APPLICATION_SERVER_URL = "https://i10e105.p.ssafy.io/";

export default function OpenViduComponent() {
    const step = useRecoilValue(stepState);
    const challengeId = useRecoilValue(challengeIdState); // sessionKey로 쓰일 챌린지ID
    const enteringTruthRoomMemberInfo = useRecoilValue(
        enteringTruthRoomMemberInfoState,
    );
    const [session, setSession] = useState(undefined);
    const [publisher, setPublisher] = useState(undefined);
    const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

    const [connectedMemberList, setConnectedMemberList] = useState([]); // 우리 서비스 기준 순서로 화면에 멤버들 띄워줄 때 사용할 리스트
    const [damJJok, setDamJJok] = useState(undefined); // 담쪽이 설정(화면 가장 위에 띄워줘야 하므로)
    const [finalArgumentDamJJok, setFinalArgumentFrameDamJJok] = useRecoilState(
        finalArgumentDamJJokState,
    ); // 최후 변론에서 중앙 컴포넌트에 담쪽이 화면 띄워줘야 해서, recoil로 담쪽이 openvidu stream 정보 저장
    function setAllDamJJok(damJJokStream) {
        // 모든 담쪽이를 set하는 함수
        const tempDamJJok = damJJokStream;
        setDamJJok(damJJokStream); // 우측 컴포넌트에 띄울 담쪽이 정보(useState)
        setFinalArgumentFrameDamJJok(tempDamJJok); // 최후 변론에서 중앙에 띄울 담쪽이 정보(useRecoilState)
    }

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
                ) {
                    setAllDamJJok(subscriber);
                } else
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
                            resolution: "640x360",
                            frameRate: 30,
                            insertMode: "APPEND",
                            mirror: false,
                        },
                    );

                    session.publish(publisher);

                    const devices = await OV.current.getDevices();
                    const videoDevices = devices.filter(
                        (device) => device.kind === "videoinput",
                    );
                    const currentVideoDeviceId = publisher.stream
                        .getMediaStream()
                        .getVideoTracks()[0]
                        .getSettings().deviceId;
                    const currentVideoDevice = videoDevices.find(
                        (device) => device.deviceId === currentVideoDeviceId,
                    );

                    setPublisher(publisher);
                    setCurrentVideoDevice(currentVideoDevice);
                    if (enteringTruthRoomMemberInfo.role === "Damjjok") {
                        // 입장한 본인이 담쪽이인 경우를 위한 set 로직
                        // setAllDamJJok(publisher);
                        setAllDamJJok(publisher);
                    }
                } catch (error) {
                    console.log(
                        "There was an error connecting to the session:",
                        error.code,
                        error.message,
                    );
                }
            });
        }
    }, [session]);

    const leaveSession = useCallback(() => {
        // Leave the session
        if (session) {
            closeOpenviduSession(challengeId); // 지금은 테스트라 여기 뒀지만 나중에는 소켓에서 마지막 남은 사람이 나갈 때 실행됨.
            session.disconnect();
        }

        // Reset all states and OpenVidu object
        OV.current = new OpenVidu();
        setSession(undefined);
        setConnectedMemberList([]);
        setPublisher(undefined);
        setDamJJok(undefined);
    }, [session]);

    const deleteSubscriber = useCallback((streamManager) => {
        setConnectedMemberList((prevConnectedMemberList) => {
            const index = prevConnectedMemberList.indexOf(streamManager);
            if (index > -1) {
                const newConnectedMemberList = [...prevConnectedMemberList];
                newConnectedMemberList.splice(index, 1);
                return newConnectedMemberList;
            } else {
                return prevConnectedMemberList;
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
    }, [challengeId]);

    const createSession = async () => {
        const response = await axios.post(
            APPLICATION_SERVER_URL + "api/v1/sessions",
            { sessionKey: challengeId },
        );
        return response.data; // The sessionId
    };

    const createToken = async (sessionId) => {
        const response = await axios.post(
            APPLICATION_SERVER_URL +
                "api/v1/sessions/" +
                sessionId +
                "/connections",
        );
        return response.data.token; // The token
    };
    return (
        <div className="container">
            <div id="session">
                <div id="video-container" className="col-md-6">
                    <Wrapper>
                        {damJJok !== undefined && step !== 4 ? ( // 담쪽이 화면, 최후 변론 단계(4)에서는 담쪽이 화면 우측 프레임에서 빼와서 중앙에만 배치함
                            <UserVideoComponent streamManager={damJJok} />
                        ) : null}
                        {publisher !== undefined && publisher !== damJJok ? ( // 본인 화면
                            <UserVideoComponent streamManager={publisher} />
                        ) : null}
                        {connectedMemberList.map(
                            (
                                mem,
                                i, // 나머지 멤버들 화면
                            ) => (
                                <UserVideoComponent streamManager={mem} />
                            ),
                        )}
                    </Wrapper>
                </div>
                <div id="session-header">
                    <div id="join" style={{ marginTop: "10px" }}>
                        <div id="join-dialog" className="jumbotron">
                            {session === undefined ? (
                                <div className="text-center">
                                    <Button
                                        className="btn"
                                        onClick={joinSession}
                                        style={{
                                            cursor: "pointer",
                                            borderRadius: "20px",
                                        }}
                                        colorScheme={"yellow"}
                                    >
                                        <ViewIcon boxSize={"2em"} />
                                        &nbsp;내 화면 보여주기
                                    </Button>
                                </div>
                            ) : null}
                            {session !== undefined ? (
                                <div className="text-center">
                                    <Button
                                        className="btn"
                                        onClick={leaveSession}
                                        style={{
                                            cursor: "pointer",
                                            borderRadius: "20px",
                                        }}
                                        colorScheme={"yellow"}
                                    >
                                        <ViewOffIcon boxSize={"2em"} />
                                        &nbsp;내 화면 가리기
                                    </Button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
