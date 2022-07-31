import './Details.css'
import Example from '../Movies/Movies'
import { useNavigate } from 'react-router-dom'
import YouTubePage from './YouTubePage';
import { Button } from '@mui/material';
import { useState } from 'react';
import Select from 'react-select'
import axios from "axios";


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
    const [selectedOption, setSelectedOption] = useState("none");



    function handleSubmitWatchNow(videoId, movieNum) {
        navigate('/YouTubePage', { state: { movieId: videoId, movieNum: movieNum } });
    }

    function HostRoom(videoId, videoName, username, hostUsername, movieNum) {
        navigate('/YouTubePage', { state: { movieId: videoId, movieName: videoName, username: username, hostUsername: hostUsername, isHost: true, movieNum: movieNum } });
    }

    function EnterRoom(videoId, videoName, username, hostUsername, movieNum) {
        navigate('/YouTubePage', { state: { movieId: videoId, movieName: videoName, username: username, hostUsername: hostUsername, isHost: false, movieNum: movieNum } });
    }

    const options = [
        { value: '0', label: '0' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' }

    ]
    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            // width: state.selectProps.width,
            borderBottom: '1px dotted pink',
            color: state.selectProps.menuColor,
            padding: 20,
        }),

        // control: (_, { selectProps: { width } }) => ({
        //     width: width
        // }),

        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';

            return { ...provided, opacity, transition };
        }
    }

    const handleTypeSelect = e => {
        setSelectedOption(e.value);
        updateRate()
    };

    const updateRate = async () => {
        await axios.post(`http://localhost:5000/recommender/rate/` + props.username, { movie_id: props.movieNum, rating: selectedOption })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.data.msg)
                    console.log(error.response.headers)
                }
            })
    };
    debugger;


    const getRate = async () => {
        debugger
        await axios.get(`http://localhost:5000/recommender/rate/` + props.username, { movie_id: props.movieNum })
            .then((response) => {
                console.log(response);
                const rate = response.data['rate']
                if (rate === -1) {
                    setSelectedOption("none")
                } else {
                    setSelectedOption(rate)
                    return
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.data.msg)
                    console.log(error.response.headers)
                }
            })

    };

    const placeholderValue = (selectedOption == "none") ? 'rate the movie' : getRate()


    return (
        <div className='detailsPage' style={{ backgroundImage: `url(${backdropImage})` }}>
            <div className='banner'>
                <div className='details'>
                    <h1 className='movieTitleD'> {props.name} </h1>
                    <p className='movieDescriptionD'> {props.movieDescription} </p>
                    <div style={{ marginBottom: '30px' }}></div>
                    <hr style={{ opacity: '0.1' }}></hr>
                    <div style={{ marginBottom: '15px' }}></div>

                    <div style={{ display: 'inline-flex' }}>
                        {
                            props.movieGenres === undefined ? "" : props.movieGenres.map((genre, index) => {
                                return (
                                    <div>
                                        <h4 key={index} style={{ marginRight: '10px', fontWeight: 'normal' }} className='movieGenreD'> {genre} </h4>
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
                                    handleSubmitWatchNow(id, props.movieNum);
                                }}> Watch now </Button>
                                <Button onClick={() => {
                                    const id = extractVideoID(props.movieURL);
                                    HostRoom(id, props.name, props.username, props.username, props.movieNum);
                                }}> Host a room </Button>
                                <Button onClick={() => setShow(!show)}> Enter existing room </Button>
                                {show ?
                                    <div className='enter_room' type>
                                        <input value={roomName}
                                            onChange={(e) => setRoomName(e.target.value)}
                                            placeholder="Enter hosts username"
                                            type="text" />
                                        <Button onClick={() => {
                                            const id = extractVideoID(props.movieURL);
                                            EnterRoom(id, props.name, props.username, roomName, props.movieNum);
                                        }} type="submit">Enter room</Button>
                                    </div> : null}
                            </div>
                    }


                    <div style={{ paddingBottom: '20px' }}></div>
                    <p>  {"user rating: "} </p>

                    <Select styles={customStyles} menuColor='black' menuPortalTarget={document.querySelector('body')} //value={selectedOption}
                        options={options} placeholder={placeholderValue}
                        onChange={handleTypeSelect}
                        value={options.filter(function (option) {
                            return option.value === selectedOption;
                        })}
                    // {/* // onChange={e => setSelectedOption(e.target.value)} */}

                    // {/* onChange={(e) => { onChange() }} //props.movieNum, e.target.value) }} //value={this.state.selectedOption} */}
                    />


                </div>

                <div>
                    <a href={props.homepage}> <img alt='moviePoster' className='moviePosterD' src={props.imageURL}></img> </a>
                </div>
            </div>
        </div>
    );
}