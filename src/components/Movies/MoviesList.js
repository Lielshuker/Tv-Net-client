import './MoviesList.css'
import { useState, useEffect } from 'react';
import { Details } from './Details'
import { EachMovie } from './EachMovie';
import { useLocation } from 'react-router-dom';
import logo from '../logo.png';

export default function MoviesList (props) {

    let [movieList, setMovieList] = useState([]);
    let [updateVal, setUpdateVal] = useState(0);
    const [currentIndex, changeCurrentIndex] = useState(0);
    const [movieID, setMovieID] = useState(1);
    const [movieDetails, setMovieDetails] = useState({}); 
    const [movieGenres, setMovieGenres] = useState(movieDetails['genres'])
    const [searchTerm, setSearchTerm] = useState("");

    const { state } = useLocation();
    const username = state.username;


    useEffect(() => {
        fetch('http://localhost:5000/movies/allMovies')
        .then((result) => result.json())
        .then((resultJSON) => {setMovieList(resultJSON.movies); console.log(resultJSON)})
        .catch((e) => console.log(e))
        .finally(() => {setUpdateVal(1)})
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/movies/' + movieID)
        .then((result) => result.json())
        .then((resultJSON) => {setMovieDetails(resultJSON); setMovieID(resultJSON['id']);})
        .catch((e) => console.log(e))
        .finally(() => {setMovieGenres(movieDetails['genre_id'])})
    }, [movieID]);

    useEffect(() => {
        setMovieGenres(movieDetails['genre_id']);
    }, [movieDetails])

    function changeMovie(index) {
        movieList.length > 0 ? setMovieID(movieList[index]['id']) : setMovieID(453365);
        changeCurrentIndex(index);
        scrollToTop();
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    return (
        <div>   
            <div className='header'>
                <a href="https://www.themoviedb.org/">
                    <img src={logo} alt="TMDB" className='tmdbLogo'></img>
                    </a> 
                {/* {
                    movieList.length > 0 ? (
                        <h1 className='headerMovieTitle'> Trending Movies & Series  </h1>
                        )
                    : (
                        <h1 className='headerMovieTitle'> Loading... </h1>
                    )
                } */}
            </div>
            {
                movieList.length > 0 ? 
                <div>
                        <div>
                            <Details
                                id='top'
                                name={movieDetails['name']}
                                length={movieDetails['length']}
                                genreID={movieDetails['genre_id']}
                                releaseYear={movieDetails['release_year']}
                                dateAdded={movieDetails['date_added']} 
                                movieDescription={movieDetails['description']}
                                movieURL={movieDetails['movie_url']} 
                                imageURL={movieDetails['image_url']} 
                                movieGenres={movieGenres}
                                username={username}
                            />
                        </div>

                        <div className='search__movie'>
                            <form>
                                <input type="text"
                                placeholder='Search a movie'
                                onChange={(event) => {
                                    setSearchTerm(event.target.value);
                                }} />
                            </form>
                        </div>

                        <div className='gridView'>
                            {
                                movieList.filter((val) => {
                                    if (searchTerm == "") {
                                        val.toShow = true;
                                        return val;
                                    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        val.toShow = true;
                                        return val;
                                    } else {
                                        val.toShow = false;
                                        return val;
                                    }
                                }).map((movie, index) => {
                                    return (
                                        movie.toShow ? 
                                        <div>
                                            <EachMovie key={index} index={index} onClickFunc={changeMovie} imageURL={movieList[index]["image_url"]} movieDescription={movieList[index]["description"]} name={movieList[index]['name']} releaseYear={movieList[index]['release_year']} />
                                        </div>
                                        : null
                                    )
                                })
                            }
                        </div>
                        
                    </div>
                : <Details bgImage='' moviePoster='' movieRD='Release Date' movieTitle= 'Movie Title' />

            }
        </div>
    )

}