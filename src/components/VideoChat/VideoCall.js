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
            try {
                init();
            } catch (error) {
                console.log(error);
            }
        }
    }, [ready, tracks, token]);

    return (
        <Grid container className='video__body' direction="column" style={{ height: "65%" }}>
            <Grid item style={{ height: "5%" }}>
                {ready && tracks && (
                    <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} client={client}/>
                )}
            </Grid>
            <Grid item style={{ height: "95%" }}>
                {start && tracks && (
                    <Video tracks={tracks} users={users} style={{ width: "50%" }}/>
                )}
            </Grid>
        </Grid>
    )
}