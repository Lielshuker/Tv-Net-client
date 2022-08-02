import './EachMovie.css';
export const EachMovie = (props) => {
    let poster = props.imageURL;
    return (
        <div className='movieStack' onClick={(e) => props.onClickFunc(props.index)}>
            <div className="eachMovie">
                <img alt="moviePoster" src={poster} className="moviePoster"/>
                <h1 className="movieTitle"> {props.name} </h1>
            </div>
            <div className='movieDescription' style={{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5) ), url(${poster})`}}>
                <h3> Title </h3>
                <p> {props.name} </p>
                <h3> Description </h3>
                <p> {props.movieDescription} </p>
                <h4> Release Year </h4>
                <p> {props.releaseYear} </p>
            </div>
        </div>
    );
}