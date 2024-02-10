// src/firebaseMessaging.js
import { getMessaging, getToken } from "firebase/messaging";
import firebaseApp from "./firebaseConfig";
import axios from "axios";

const messaging = getMessaging(firebaseApp);

export const requestForToken = (accessToken) => {
    return getToken(messaging, {
        vapidKey:
            "BHAJQl2Y3UwusL9mZsf1X1G1k2glim3x5gylLPF5oS2EXt2Ocqy7DOS4PFxLAIPQo-yoBKABDneffDkiBqbVEFI",
    })
        .then((currentToken) => {
            if (currentToken) {
                console.log("Token:", currentToken);
                const url = "https://i10e105.p.ssafy.io/api/v1/auth/fcmToken";

                axios
                    .post(
                        url,
                        {
                            fcmToken: currentToken,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`, // 헤더에 액세스 토큰 추가
                            },
                        }
                    )
                    .then((response) =>
                        console.log(
                            "FCM Token sent successfully:",
                            response.data
                        )
                    )
                    .catch((error) =>
                        console.error("Error sending FCM Token:", error)
                    );
            } else {
                console.log(
                    "No registration token available. Request permission to generate one."
                );
                // 사용자에게 알림 권한 요청
            }
        })
        .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
        });
};
