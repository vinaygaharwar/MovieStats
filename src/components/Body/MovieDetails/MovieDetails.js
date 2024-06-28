import React, { useEffect, useState } from "react";
import { API_URL } from "../../../utility/api";

const MovieDetails = ({ imdbID }) => {
  const [movieData, setMovieData] = useState(null);
  const [feedback, setFeedback] = useState("");

  const getMovieData = async () => {
    try {
      const response = await fetch(`${API_URL}&i=${imdbID}`);
      const data = await response.json();
      setMovieData(data);
    } 
    catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    getMovieData();
    // eslint-disable-next-line
  }, [imdbID]);

  const addFav = (favMovie) => {
    const data = JSON.parse(localStorage.getItem("favmovie")) || [];
    localStorage.setItem("favmovie", JSON.stringify([...data, favMovie]));
    setFeedback(`Added ${favMovie.Title} to favorites`);
    setTimeout(() => {
      setFeedback("");
    }, 1000);
  };

  const truncatePlot = (plot, maxLength) => {
    return plot && plot.length > maxLength ? plot.substring(0, maxLength) + "..." : plot;
  };

  return (
    <div className="movie-details">
      {feedback && <div className="feedback" role="alert">{feedback}</div>}
      {movieData ? (
        <div className="details-container">
          <h2 className="title">{movieData.Title}</h2>
          <p className="year">{movieData.Year}</p>
          <div className="poster-description">
            <img className="poster" src={movieData.Poster} loading="lazy" alt={`${movieData.Title} Poster`} />
            <p className="plot">{truncatePlot(movieData.Plot, 100)}</p>
          </div>
          <div className="rating-genre">
            <p className="rating">⭐ {movieData.imdbRating}</p>
            <p className="genre">{movieData.Genre}</p>
          </div>
          <div className="details">
            <p className="detail"><strong>Directors:</strong> {movieData.Director}</p>
            <p className="detail"><strong>Writers:</strong> {movieData.Writer}</p>
            <p className="detail"><strong>Actors:</strong> {movieData.Actors}</p>
          </div>
          <button className="add-fav-btn" onClick={() => addFav(movieData)}>
          ❤️ Add to Favorites
          </button>
        </div>
      ):<div>loading..</div>}
    </div>
  );
};

export default MovieDetails;
