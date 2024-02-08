// Import the Firebase scripts using importScripts
importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js",
);
importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js",
);

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDyTbwQXnn8-O9jqcmAmNGY96rRMKqfFgU",
    authDomain: "damjjok.firebaseapp.com",
    projectId: "damjjok",
    storageBucket: "damjjok.appspot.com",
    messagingSenderId: "24603901756",
    appId: "1:24603901756:web:1ee2ba95426e5fb222a839",
    measurementId: "G-1C9HMSFY6Y",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

// If you want to use onBackgroundMessage (for background messages),
// you should instead use the 'setBackgroundMessageHandler' in compat version:
messaging.onBackgroundMessage(function (payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/firebase-logo.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});
