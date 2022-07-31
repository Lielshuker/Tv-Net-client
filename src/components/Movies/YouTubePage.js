import React, { Component } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import Chatbox from '../Chat/Chatbox';
import "./YouTubePage.css";
import logo from '../logo.png';

function onReady(event) {
    event.target.playVideoAt(50);
    //event.target.pauseVideo();
}


export default function YouTubePage() {
    const { state } = useLocation();
    if (!state.movieName) {
        const opts = {
            height: '585',
            width: '960',
            playerVars: {
                autoplay: 1
            }
        };

        const videoId = state.movieId;
        console.log(videoId);

        return (
            <div>
                <YouTube videoId={videoId} opts={opts} onReady={onReady} />
            </div>
        );
    } else {
        const movieId = state.movieId;
        const movieName = state.movieName;
        const username = state.username;
        const hostUsername = state.hostUsername;
        const isHost = state.isHost;
        const movieNum = state.movieNum
        const opts = {
            height: '585',
            width: '960',
            playerVars: {
                autoplay: 1
            }
        };

        return (
            <div className='full__screen'>
                <div className='header'>
                    <a href="https://www.themoviedb.org/">
                        <img src={logo} alt="TMDB" className='tmdbLogo'></img>
                    </a>
                </div>

                <div className='screen'>
                    <div className='youtube__screen'>
                        <YouTube videoId={movieId} opts={opts} onReady={onReady} />
                    </div>
                    <div className='chatbox__screen'>
                        <Chatbox movieId={movieId} movieName={movieName} username={username} hostUsername={hostUsername} isHost={isHost} movieNum={movieNum} />
                    </div>
                    {/* <YouTube videoId={movieId} opts={opts} onReady={onReady} /> */}
                </div>
            </div>

        );
    }


}