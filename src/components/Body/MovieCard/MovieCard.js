import React, { useState } from "react";
import MovieDetails from "../MovieDetails/MovieDetails";

const MovieCard = ({ movie }) => {
    const [movieId, setMovieId] = useState();

    return (
        <div className="card" onMouseEnter={() => setMovieId(movie.imdbID)} onMouseLeave={() => setMovieId("loading")}>
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <div>
                        <p>{movie.Year}</p>
                    </div>
                    <div>
                        <img
                            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"}
                            alt={movie.Title}
                        />
                    </div>
                    <div>
                        <span>{movie.Type}</span>
                        <h3>{movie.Title}</h3>
                    </div>
                </div>
                <div className="flip-card-back">
                    <MovieDetails imdbID={movieId} />
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
