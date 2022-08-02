import React, { Component, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import Chatbox from '../Chat/Chatbox';
import VideoChat from "../VideoChat/VideoChat";
import "./YouTubePage.css";
import logo from '../logo.png';
import db from "../../firebase";
import firebase from "firebase";

function onReady(event) {
    event.target.playVideoAt(50);
}


export default function YouTubePage() {
    const { state } = useLocation();
    const movieId = state.movieId;
    const movieName = state.movieName;
    const username = state.username;
    const hostUsername = state.hostUsername;
    const isHost = state.isHost;
    const movieNum = state.movieNum


    const roomName = hostUsername + movieId;

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
                <a href='http://localhost:3000/moviesList'>
                    <img src={logo} alt="TMDB" className='tmdbLogo'></img>
                </a>
            </div>
            <div className='screen'>
                <div className='youtube__screen'>
                    <YouTube videoId={movieId} opts={opts} onReady={onReady} />
                </div>
                {state.movieName ? (
                    <div className='chatbox__screen'>
                        <Chatbox movieId={movieId} movieName={movieName} username={username} hostUsername={hostUsername} isHost={isHost} movieNum={movieNum} />
                    </div>
                ) : null}
            </div>
        </div>
    );


    // const { state } = useLocation();

    // if (!state.movieName) {
    //     const opts = {
    //         height: '585',
    //         width: '960',
    //         playerVars: {
    //             autoplay: 1
    //         }
    //     };

    //     const videoId = state.movieId;

    //     return (
    //         <div>
    //             <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    //         </div>
    //     ); 
    // } else {
    //     const movieId = state.movieId;
    //     const movieName = state.movieName;
    //     const username = state.username;
    //     const hostUsername = state.hostUsername;
    //     const isHost = state.isHost;
    //     const opts = {
    //         height: '585',
    //         width: '960',
    //         playerVars: {
    //             autoplay: 1
    //         }
    //     };
    //     const roomName = hostUsername + movieId;

    //     return (
    //         <div className='full__screen'>
    //             <div className='header'>
    //             <a href="https://www.themoviedb.org/">
    //                 <img src={logo} alt="TMDB" className='tmdbLogo'></img>
    //             </a> 
    //         </div>

    //         <div className='screen' style={{ height: "1000px" }}>
    //             <div className='youtube__screen' style={{ height: "100%" }}>
    //                 <YouTube videoId={movieId} opts={opts} onReady={onReady} />
    //                 {/* <VideoChat roomName={roomName} isHost={isHost} /> */}
    //             </div>

    //             <div className='chatbox__screen'>
    //                 <Chatbox movieId={movieId} movieName={movieName} username={username} hostUsername={hostUsername} isHost={isHost} />
    //             </div>
    //         </div>
    //         </div>

    //     ); 
    // } 
}