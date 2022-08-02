import React, { useState, useEffect } from "react";
import "./Chat.css";
import db from "../../firebase";
import firebase from "firebase";
import { useNavigate } from "react-router";
import axios from "axios";


function Chat(props) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [participants, setParticipants] = useState([]);
    const movieName = props.movieName;
    const username = props.username;
    const roomName = props.roomName;
    const roomId = props.roomId;
    const isHost = props.isHost;
    const movieId = props.movieId


    const navigate = useNavigate();
    const { ready, tracks, setStart, setInCall, client } = props;

    useEffect(() => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        var dateTime = date + ' ' + time;
        axios.post('http://localhost:5000/watched_movies/' + movieId, { participants: participants, date: dateTime })
            .then((result) => result.json())
            .catch((e) => console.log(e))
    }, [movieId, participants]);


    useEffect(() => {
        roomId && db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
    }, [roomId]);

    useEffect(() => {
        roomId && db.collection('rooms').doc(roomId).onSnapshot((snapshot) => setParticipants(snapshot.data().participants));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput("");
    }

    const leaveRoom = (e) => {
        e.preventDefault();

        var tempDB = firebase.firestore();
        var deletedRef = db.collection('rooms').doc(roomId);
        var batch = db.batch();


        // batch.update(deletedRef, {participants: firebase.firestore.FieldValue.arrayRemove(username)});

        // batch.commit().then(() => navigate("/moviesList", { state: { username: username} }))
        // .catch(err => console.error('Failed!', err));

        if (participants.length == 1) {
            db.collection('rooms').doc(roomId).delete()
            .then(() => navigate("/moviesList", { state: { username: username } }))
            .catch(err => console.error('Failed!', err));
        } else {
            batch.update(deletedRef, {participants: firebase.firestore.FieldValue.arrayRemove(username)});
            batch.commit().then(() => navigate("/moviesList", { state: { username: username} }))
            .catch(err => console.error('Failed!', err));
        }
        
        const leaveChannel = async () => {
            await client.leave();
            client.removeAllListeners();
            tracks[0].close();
            tracks[1].close();
            setStart(false);
            setInCall(false);
        };
        
        leaveChannel();
    }

    const leaveAgoraVideoRoom = () => {

    }

    window.addEventListener("beforeunload", (ev) => {
        leaveRoom(ev);
    })

    return (
        <div className='chat'>
            <div className="chat__header">
                <div className="chat__headerInfo">
                    <div className="chat__leave">
                        <h3>{movieName}</h3>
                        <button className="button_leaveRoom" onClick={leaveRoom}>Leave Room</button>
                    </div>
                    <div className="chat__participants">
                        {participants.map((participant) => (
                            <p>{participant}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) => (
                    <p className={`chat__message ${message.username === username && "chat__reciever"}`}>
                        <span className="chat__name">{message.username}</span>
                        {message.message}
                        <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <form>
                    <input value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
            </div>
        </div>
    );
}

export default Chat;