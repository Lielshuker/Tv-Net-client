import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import "./Chatbox.css";
import db from "../../firebase";
import firebase from "firebase";
import VideoChat from "../VideoChat/VideoChat";
import VideoCall from "../VideoChat/VideoCall";
import { createRoutesFromChildren } from "react-router";
import { useClient, useMicrophoneAndCameraTracks } from "../VideoChat/settings";


function Chatbox(props) {
    const [rooms, setRooms] = useState([]);
    const [roomId, setRoomId] = useState("");
    const [token, setToken] = useState("");
    const movieId = props.movieId;
    const movieName = props.movieName;
    const username = props.username;
    const hostUsername = props.hostUsername;
    const isHost = props.isHost;
    const movieNum = props.movieNum
    const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();
    const [start, setStart] = useState(false);
    const [inCall, setInCall] = useState(true);

    const roomName = hostUsername + movieId;

    function getKeyFromFirebase(roomName) {
        var i;
        for (i = 0; i < rooms.length; i++) {
            if (rooms[i].data.name == roomName) {
                setRoomId(rooms[i].id)
            }
        }
        return null;
    }

    function addParticipant() {
        db.collection('rooms').doc(roomId).update({
            participants: firebase.firestore.FieldValue.arrayUnion(username)
        });
    }

    const createRoom = () => {
        db.collection('rooms').add({
            name: roomName,
            participants: [username]
        })

        .then(function(docRef) {
            console.log("ID: ", docRef.id);
            console.log(roomId);
            setRoomId(docRef.id);
            console.log(roomId);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error)
        });
    }

    const enterRoom = () => {
        db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        ))
    }

    const createAgoraVideoRoom = () => {
        const url = `http://localhost:8080/access_token?channelName=${roomName}&role=subscriber`;
        fetch(url).then(response => response.json()).then(data => {
            setToken(data['token']);
            console.log(data['token']);
            var roomRef = db.collection('rooms').doc(roomId);
            var setWithMerge = roomRef.set({
                'token': data['token']
            }, { merge: true });
        });
    }

    const enterAgoraVideoRoom = () => {
        console.log(roomId);
        db.collection('rooms').doc(roomId).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data: ", doc.data());
                console.log("Agora-token: ", doc.data().token);
                setToken(doc.data().token);
            } else {
                console.log("No such document");
            }
        }).catch((error) => {
            console.log("Error getting document: ", error);
        });
    }

    useEffect(() => {
        if (isHost) {
            createRoom();
        } else {

            enterRoom();
        }
    }, []);

    useEffect(() => {
        rooms.length && getKeyFromFirebase(roomName);
    }, [rooms]);

    useEffect(() => {
        roomId && addParticipant();
    }, [roomId]);

    useEffect(() => {
        if (isHost) {
            roomId && createAgoraVideoRoom();
        } else {
            roomId && enterAgoraVideoRoom();
        }
    }, [roomId]);


    return (
        <div className="chatbox">
            <div className="chatbox__body">
                <Chat movieName={movieName} username={username} roomName={roomName} roomId={roomId} isHost={isHost}  movieId={movieNum}
                setInCall={setInCall} ready={ready} tracks={tracks} setStart={setStart} client={client} />
                <VideoCall className="videochat__body" roomName={roomName} isHost={isHost} roomId={roomId} token={token} 
                setInCall={setInCall} ready={ready} tracks={tracks} setStart={setStart} client={client} start = {start} />
            </div>
        </div>
    );
}

export default Chatbox;