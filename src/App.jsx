import { useCallback, useState } from 'react';
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
import { useLocalStorage } from './hooks/useLocalStorage';
import { useMovies } from './hooks/useMovies';



export default function App() {
  const [query, setQuery] = useState('');
  const [watched, setWatched] = useLocalStorage([]);

  const memoizedHandleCloseMovie = useCallback(handleCloseMovie, []);
  const { movies, error, isLoading } = useMovies(query, memoizedHandleCloseMovie);

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

  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter(item => item.imdbID !== id));
  }

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
              watched={watched}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>
          )}
        </Box>
      </MainContainer>
    </>
  );
}


