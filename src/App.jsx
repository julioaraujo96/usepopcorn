import { useEffect, useState } from 'react';
import { NavBar } from './components/NavBar';
import { Search } from './components/Search';
import { ErrorMessage } from './components/ErrorMessage';
import { NumResults } from './components/NumResults';
import { MainContainer } from './components/MainContainer';
import { Loader } from './components/Loader';
import { Box } from './components/Box';
import { MovieList } from './components/MovieList';
import { MovieDetails } from './components/MovieDetails';
import { WatchedSummary } from './components/WatchedSummary';
import { WatchedMoviesList } from './components/WatchedMoviesList';



export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  function handleSetQuery(query) {
    setQuery(query);
  }

  function handleSelectMovie(id) {
    setSelectedId( prevId => prevId === id ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched( watched  => [...watched, movie])
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError('');
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}?apikey=${import.meta.env.VITE_API_KEY}&s=${query}`);

        if (!response.ok) {
          throw new Error('Something went wrong while fetching movies.');
        }

        const data = await response.json();

        if (data.Response === 'False') {
          throw new Error('Movie not found');
        }
        setMovies(data.Search);
        setError('');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    fetchData();
  }, [query]);

  return (
    <>
      <NavBar>
        <Search onQuery={handleSetQuery} query={query} />
        <NumResults movies={movies} />
      </NavBar>

      <MainContainer>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </Box>
      </MainContainer>
    </>
  );
}


