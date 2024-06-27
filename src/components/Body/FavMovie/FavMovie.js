import React, { useEffect, useState } from 'react';

function FavMovie() {
  const [movieItems, setMovieItems] = useState([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('favmovie')) || [];
    setMovieItems(storedMovies);
  }, []);

  const handleRemoveMovie = (movieToRemove) => {
    const updatedMovies = movieItems.filter((movie) => movie.imdbID !== movieToRemove.imdbID);
    setMovieItems(updatedMovies);
    localStorage.setItem('favmovie', JSON.stringify(updatedMovies));
    setFeedback(`Removed ${movieToRemove.Title}`);
    setTimeout(() => {
      setFeedback('');
    }, 1000);
  };

  return (
    <div className="movie-items">
      {feedback && <p className="feedback">{feedback}</p>}
      <h2>Favourites</h2>
      <div className="movie-list">
        {movieItems.length > 0 ?
          movieItems.map((movie) => (
            <div className="movie-card" key={movie.imdbID}>
              <div className="movie-img">
                <img src={movie.Poster} alt={movie.Title} />
              </div>
              <div className="movie-details">
                <h3>{movie.Title}</h3>
                <p>Release Year: {movie.Year}</p>
                <button onClick={() => handleRemoveMovie(movie)} className="remove-btn">
                  Remove
                </button>
              </div>
            </div>
          )):<div>Add Favourites..</div>}
      </div>
    </div>
  );
}

export default FavMovie;
