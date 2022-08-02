import { useState } from "react";
// import { Button } from "@material-ui/core";
import VideoCall from "./VideoCall";

function VideoChat(props) {
    // const [inCall, setInCall] = useState(true);
    const roomName = props.roomName;
    const isHost = props.isHost;
    const roomId = props.roomId;
    const token = props.token;

    const { ready, tracks, setStart, setInCall, client, start } = props;

    return (
        <div className="VideoChat">
            <VideoCall setInCall={setInCall} roomName={roomName} isHost={isHost} roomId={roomId} token={token}
                setInCall={setInCall} ready={ready} tracks={tracks} setStart={setStart} client={client} start={start} />
            {/* {inCall ? (
                <VideoCall setInCall={setInCall} roomName={roomName} isHost={isHost} roomId={roomId} />
            ) : (
                <Button variant="contained" color="primary" onClick={() => setInCall(true)}>Join Call</Button>
            )} */}
        </div>
    )
}

export default VideoChat;