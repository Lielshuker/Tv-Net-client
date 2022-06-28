import './Details.css'
import Example from '../Movies/Movies'
import {useNavigate} from 'react-router-dom'
import YouTubePage from './YouTubePage';
import { Button } from '@mui/material';
import { useState } from 'react';

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
    const [show, setShow] = useState(false);

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
                                        EnterRoom(id, props.name, props.username, roomName);
                                    }} type="submit">Enter room</Button>
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