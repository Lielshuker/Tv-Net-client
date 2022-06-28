import React, { useState, useEffect } from "react";
import "./Chat.css";
import db from "../../firebase"; // Maybe wrong!!!
import firebase from "firebase";
import { useNavigate } from "react-router";

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

    const navigate = useNavigate();


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

        batch.update(deletedRef, {participants: firebase.firestore.FieldValue.arrayRemove(username)});

        //batch.commit().then(() => console.log('Succsess!')).catch(err => console.error('Failed!', err));

        batch.commit().then(() => navigate("/moviesList", { state: { username: username} })).catch(err => console.error('Failed!', err));

        //navigate("/moviesList", { state: { username: username} })


        // if (isHost) {

        // } else {
        //     var tempDB = firebase.firestore();
        //     var deletedRef = db.collection('rooms').doc(roomId);
        //     var batch = db.batch();

        //     batch.update(deletedRef, {participants: firebase.firestore.FieldValue.arrayRemove(username)});

        //     batch.commit().then(() => console.log('Succsess!')).catch(err => console.error('Failed!', err));
        // }

        // if (isHost) {
        //     db.collection('rooms').doc('iNadwEruM7893Lz9YL43').delete();
        // }
    }

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
                    type="text"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
            </div>
        </div>
    );
}

export default Chat;