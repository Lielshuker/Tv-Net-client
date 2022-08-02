import './Details.css'
import Example from '../Movies/Movies'
import {useNavigate} from 'react-router-dom'
import YouTubePage from './YouTubePage';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import db from '../../firebase';

function genreListToString(genres) {
    let genresStr = "";
    genres.map((genre, index) => {
        genresStr = genresStr + genre + ", ";
    });
    genresStr = genresStr.slice(0, -2);
    return genresStr;
}

function extractVideoID(url) {
    const splitted = url.split("/");
    const len = splitted.length;
    return splitted[len - 1];
}

export const Details = (props) => {
    const navigate = useNavigate();
    let backdropImage = props.imageURL;
    const [roomName, setRoomName] = useState("");
    const [rooms, setRooms] = useState([]);
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);

    function handleSubmitWatchNow(videoId) {
        console.log(videoId);
        navigate('/YouTubePage', { state: { movieId: videoId } });
    }

    function HostRoom(videoId, videoName, username, hostUsername) {
        navigate('/YouTubePage', { state: { movieId: videoId, movieName: videoName, username: username,hostUsername: hostUsername, isHost: true } });
    }

    function EnterRoom(videoId, videoName, username, hostUsername) {
        navigate('/YouTubePage', { state: { movieId: videoId, movieName: videoName, username: username, hostUsername: hostUsername, isHost: false } });
    }

    function ChechIfExists(videoId, hostUsername) {
        const tempRoomName = hostUsername + videoId;
        var i;
        for (i = 0; i < rooms.length; i++) {
            if (rooms[i].data.name == tempRoomName) {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        ))
    }, []);

    return (
        <div className='detailsPage' style={{backgroundImage: `url(${backdropImage})`}}>
            <div className='banner'>
                <div className='details'>
                    <h1 className='movieTitleD'> {props.name} </h1>
                    <p className='movieDescriptionD'> {props.movieDescription} </p>
                    <div style={{marginBottom: '30px'}}></div>
                    <hr style={{opacity: '0.1'}}></hr>
                    <div style={{marginBottom: '15px'}}></div>
                    <div style={{display: 'inline-flex'}}> 
                    {
                        props.movieGenres === undefined ? "" : props.movieGenres.map((genre, index) => {
                            return (
                                <div>
                                    <h4 key={index} style={{marginRight: '10px', fontWeight: 'normal'}} className='movieGenreD'> {genre} </h4>
                                </div>
                                )
                        })
                    }
                    </div>
                    {
                        props.type === "tv" ? 
                            <div>

                            </div> : 
                            <div>
                                <div className='rateAndLangD'>
                                    <p className='movieDescriptionD'>  {"Runtime: " + props.length + " mins"} </p>                              
                                </div>
                                <Button onClick={() => {
                                    const id = extractVideoID(props.movieURL);
                                    handleSubmitWatchNow(id);
                                }}> Watch now </Button>
                                <Button onClick={() => {
                                    const id = extractVideoID(props.movieURL);
                                    HostRoom(id, props.name, props.username, props.username);
                                }}> Host a room </Button>
                                <Button onClick={() => setShow(!show)}> Enter existing room </Button>
                                { show ? 
                                <div className='enter_room' type>
                                    <input value={roomName}
                                    onChange={(e) => setRoomName(e.target.value)}
                                    placeholder="Enter hosts username"
                                    type="text" />
                                    <Button onClick={() => {
                                        const id = extractVideoID(props.movieURL);
                                        if (ChechIfExists(id, roomName)) {
                                            EnterRoom(id, props.name, props.username, roomName);
                                        } else {
                                            setShowError(true);
                                        }
                                    }} type="submit">Enter room</Button>
                                    {
                                        showError && <h3 >Room doesn't exist!</h3>
                                    }
                                    
                                </div> : null}
                            </div>                         
                    }                     
                    <div style={{paddingBottom: '20px'}}></div>
                </div>
                <div>
                    <a href={props.homepage}> <img alt='moviePoster' className='moviePosterD' src={props.imageURL}></img> </a>
                </div>
            </div>
        </div>
    );
}