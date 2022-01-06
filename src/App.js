import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import Menu from "./components/Menu";
import Videos from "./components/Videos";
import "./App.css";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAYP3Z7xgpsa5Cl_Ti1z12UNUU1gqoUoTk",
  authDomain: "video-chat-3bbcb.firebaseapp.com",
  projectId: "video-chat-3bbcb",
  storageBucket: "video-chat-3bbcb.appspot.com",
  messagingSenderId: "703457965999",
  appId: "1:703457965999:web:f2e332cc5c645d1621e15a",
  measurementId: "G-8EFQJV6G69"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

// Initialize WebRTC
const servers = {
    iceServers: [
        {
            urls: [
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
            ],
        },
    ],
    iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

function App() {
    const [currentPage, setCurrentPage] = useState("home");
    const [joinCode, setJoinCode] = useState("");

    return (
        <div className="app">
            {currentPage === "home" ? (
                <Menu
                    joinCode={joinCode}
                    setJoinCode={setJoinCode}
                    setPage={setCurrentPage}
                />
            ) : (
                <Videos
                    firestore={firestore}
                    pc={pc}
                    mode={currentPage}
                    callId={joinCode}
                    setPage={setCurrentPage}
                />
            )}
        </div>
    );
}

export default App;