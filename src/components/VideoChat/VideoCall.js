import { useState, useEffect } from "react";
import { config, useClient, useMicrophoneAndCameraTracks, channelName } from "./settings.js";
import Controls from "./Controls";
import Video from "./Video";
import { Grid } from "@material-ui/core";
import axios from "axios";
import db from "../../firebase";
import firebase from "firebase";

export default function VideoCall(props) {
    const { setInCall, roomName, isHost, roomId, token, ready, tracks, start, setStart, client } = props;
    const [users, setUsers] = useState([]);
    //const [start, setStart] = useState(false);
    //const client = useClient();
    //const { ready, tracks } = useMicrophoneAndCameraTracks();
    //const [token, setToken] = useState("");

    // function getToken() {
    //     if (isHost) {
    //         const url = `http://localhost:8080/access_token?channelName=${roomName}&role=subscriber`;
    //         fetch(url).then(response => response.json()).then(data => {
    //             console.log("data['token']: ", data['token']);
    //             setToken(data['token']);
    //             console.log("token: ", token);
    //             var roomRef = db.collection('rooms').doc(roomId);
    //             var setWithMerge = roomRef.set({
    //                 'agora-token': data['token']
    //             }, { merge: true });
    //         });
    //     } else {
    //         db.collection('rooms').doc(roomId).get().then((doc) => {
    //             if (doc.exists) {
    //                 console.log("Document data: ", doc.data());
    //                 console.log("Agora-token: ", doc.agora-token)
    //             } else {
    //                 console.log("No such document");
    //             }
    //         }).catch((error) => {
    //             console.log("Error getting document: ", error);
    //         });
    //     }
    // }

    useEffect(() => {
        let init = async () => {
            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === "video") {
                    setUsers((prevUsers) => {
                        return [...prevUsers, user];
                    });
                }
                if (mediaType === "audio") {
                    user.audioTrack.play();
                }
            });

            client.on("user-unpublished", (user, mediaType) => {
                if (mediaType === "audio") {
                    if (user.audioTrack) {
                        user.audioTrack.stop();
                    }
                }
                if (mediaType === "video") {
                    setUsers((prevUsers) => {
                        return prevUsers.filter((User) => User.uid !== user.uid);
                    });
                }
            });

            client.on("user-left", (user) => {
                setUsers((prevUsers) => {
                    return prevUsers.filter((User) => User.uid !== user.uid);
                });
            });

            try {
                await client.join(config.appId, roomName, token, null);
                //await client.join(config.appId, name, config.token, null);
            } catch (error) {
                console.log("The is an error");
                console.log(error);
            }

            if (tracks) {
                await client.publish([tracks[0], tracks[1]]);
            }
            setStart(true);
        };

        if (ready && tracks && token) {
            // var roomRef = db.collection('rooms').doc(roomId);
            // var setWithMerge = roomRef.set({
            //     'agora-token': token
            // }, { merge: true });
            try {
                init();
            } catch (error) {
                console.log(error);
            }
        }
    }, [ready, tracks, token]);
    //}, [roomName, client, ready, tracks]);

    // useEffect(() => {
    //     getToken();
    // }, []);

    return (
        <Grid container className='video__body' direction="column" style={{ height: "65%" }}>
            <Grid item style={{ height: "10%" }}>
                {ready && tracks && (
                    <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} client={client} />
                )}
            </Grid>
            <Grid item style={{ height: "90%" }}>
                {start && tracks && (
                    <Video tracks={tracks} users={users} style={{ width: "50%" }} />
                )}
            </Grid>
        </Grid>
    )
}