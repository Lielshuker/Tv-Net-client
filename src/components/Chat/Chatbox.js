import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import "./Chatbox.css";
import db from "../../firebase";
import firebase from "firebase";
import { createRoutesFromChildren } from "react-router";

function Chatbox(props) {
    const [rooms, setRooms] = useState([]);
    const [roomId, setRoomId] = useState("");
    const movieId = props.movieId;
    const movieName = props.movieName;
    const username = props.username;
    const hostUsername = props.hostUsername;
    const isHost = props.isHost;

    const roomName = hostUsername + movieId;
    //let roomId = "";

    function getKeyFromFirebase(roomName) {
        console.log(rooms);
        var i;
        for (i = 0; i < rooms.length; i++) {
            if (rooms[i].data.name == roomName) {
                console.log(rooms[i].data.name);
                console.log(rooms[i].id);
                setRoomId(rooms[i].id)
                //return rooms[i].id;
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
            // roomId = docRef.id;
            // return roomId;
        })
        .catch(function(error) {
            console.error("Error adding document: ", error)
        });
    }

    // useEffect(() => {
        
    //     //temp();
    //     //console.log(roomId);
    // }, []);

    useEffect(() => {
        if (isHost) {
            createRoom();
        } else {
            db.collection('rooms').onSnapshot(snapshot => (
                setRooms(snapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        data: doc.data()
                    }
                )))
            ))
            
        }
    }, []);

    useEffect(() => {
        rooms.length && getKeyFromFirebase(roomName);
        //rooms.length && addParticipant();
    }, [rooms]);

    useEffect(() => {
        roomId && addParticipant();
    }, [roomId]);

    // function temp() {
    //     if (isHost) {        

    //         createRoom();
    //     } else {
    //         getKeyFromFirebase(roomName);
    //     }
    // }
    // temp();


    //temp();

    //roomId = temp();
    //console.log(roomId);



    // if(isHost) {
    //     createRoom();
    // } else {
    //     roomId = getKeyFromFirebase(roomName);
    //     // const admin = require("firebase-admin");
    //     // const FieldValue = admin.firestore.FieldValue;
    //     // db.collection('rooms').doc(roomId).update({
    //     //     participants: FieldValue.arrayUnion("test3")
    //     // });
    // }


    return (
        <div className="chatbox">
            <div className="chatbox__body">
                <Chat movieName={movieName} username={username} roomName={roomName} roomId={roomId} isHost={isHost}/>
            </div>
        </div>
    );
}

export default Chatbox;