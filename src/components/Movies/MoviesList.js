import './MoviesList.css'
import { useState, useEffect } from 'react';
import { Details } from './Details'
import { EachMovie } from './EachMovie';
import { useLocation } from 'react-router-dom';
import logo from '../logo.png';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { Pagination, PaginationItem } from '@mui/material';
import axios from "axios";
import { makeStyles } from '@mui/styles';
import Logout from '../Logout/Logout';
import useToken from '../App/useToken';

// import { makeStyles } from '@material-ui/core/styles/makeStyles';


export default function MoviesList(props) {

    let [movieList, setMovieList] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [total, setTotal] = useState(10);
    const [itemOffset, setItemOffset] = useState(0);
    let [updateVal, setUpdateVal] = useState(0);
    const [currentIndex, changeCurrentIndex] = useState(0);
    const [movieID, setMovieID] = useState(1);
    const [movieDetails, setMovieDetails] = useState({});
    const [movieGenres, setMovieGenres] = useState(movieDetails['genres'])
    const [searchTerm, setSearchTerm] = useState("");
    const classes = useStyles();
    const { removeToken } = useToken();



    const { state } = useLocation();
    const username = state.username;
    const itemsPerPage = 20

    const handleChangePage = (event, value) => {
        setCurrentPage(value)
        axios.post('http://localhost:5000/movies/allMovies/' + username, { page: value, per_page: itemsPerPage })
            // .then((result) => console.log(result.data))
            .then((result) => {
                // console.log(resultJSON)
                console.log(result.data)
                // const endOffset = itemOffset + itemsPerPage;
                // setMovieDetails(resultJSON.slice(itemOffset, endOffset));
                setMovieList(result.data.movies)
                setTotal(Math.ceil(result.data.total / itemsPerPage))
                setMovieID(result.data.movies[0].id)


            })

            .catch((e) => console.log(e))
            .finally(() => { setUpdateVal(1) })
        const newOffset = (event.selected * itemsPerPage) % total.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    useEffect(() => {
        // setItemOffset(15)
        // setPageCount(Math.ceil(total.length / itemsPerPage));

        axios.post('http://localhost:5000/movies/allMovies/' + username, { page: currentPage, per_page: itemsPerPage })
            // .then((result) => console.log(result.data))
            .then((result) => {
                // console.log(resultJSON)
                console.log(result.data)
                // const endOffset = itemOffset + itemsPerPage;
                // setMovieDetails(resultJSON.slice(itemOffset, endOffset));
                setMovieList(result.data.movies)//.slice(itemOffset, endOffset))
                setTotal(Math.ceil(result.data.total / itemsPerPage))
                setMovieID(result.data.movies[0].id)
                // setMovieID(2)

            })

            .catch((e) => console.log(e))
            .finally(() => { setUpdateVal(1) })
    }, [itemOffset, itemsPerPage]);

    useEffect(() => {
        fetch('http://localhost:5000/movies/' + movieID)
            .then((result) => result.json())
            .then((resultJSON) => {
                setMovieDetails(resultJSON);
                setMovieID(resultJSON['id']);
            })
            .catch((e) => console.log(e))
            .finally(() => { setMovieGenres(movieDetails['genre_id']) })
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
                <a href="http://localhost:3000/moviesList" className='logout_header'>
                    <div classname="logout">
                        <Logout token={removeToken} />

                        <img src={logo} alt="TMDB" className='tmdbLogo'></img>
                    </div>
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
                                movieNum={movieID}
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
                        <div className={classes.root}>

                            <Pagination
                                count={total} page={currentPage} shape="rounded" color="primary" onChange={handleChangePage} />
                        </div>
                    </div>

                    : <Details bgImage='' moviePoster='' movieRD='Release Date' movieTitle='Movie Title' />

            }




        </div>

    )

}

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #1E90FF 30%, #00008B 90%)',
        border: 0,
        borderRadius: 2,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        // height: 48,
        padding: '0 30px',
    },
});