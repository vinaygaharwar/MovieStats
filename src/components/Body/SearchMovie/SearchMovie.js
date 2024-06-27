import { useState, useEffect, useCallback } from 'react';
import MovieCard from '.././MovieCard/MovieCard';
import SearchIcon from '../../../assets/images/search.svg';
import { API_URL } from "../../../utility/api"

function SearchMovie() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const searchMovies = useCallback(async (title) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const debouncedSearch = debounce(searchMovies, 500);
      debouncedSearch(searchTerm);
    }
  }, [searchTerm, searchMovies]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchTerm.trim() !== '') {
      searchMovies(searchTerm);
    }
  };

  return (
    <div className='app'>
      <div className='search'>
        <input
          type='text'
          placeholder='Search for movies'
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label='Search for movies'
        />
        <button 
          onClick={handleSearchClick} 
          aria-label='Search'
          style={{ background: 'none', border: 'none', padding: '0', cursor: 'pointer' }}
        >
          <img src={SearchIcon} alt='Search icon' />
        </button>
      </div>

      {loading && <div className='loading'>Loading...</div>}

      {error && <div className='empty'><h2>{error}</h2></div>}

      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        !loading &&
        !error && (
          <div className='empty'>
            <h2>Discover Movies, Your Way...</h2>
          </div>
        )
      )}
    </div>
  );
}

export default SearchMovie;
