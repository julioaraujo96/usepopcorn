import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import { ErrorMessage } from './ErrorMessage';
import { Loader } from './Loader';
import PropTypes from 'prop-types';

MovieDetails.propTypes = {
  selectedId: PropTypes.string,
  onCloseMovie: PropTypes.func,
  onAddWatched: PropTypes.func,
  watched: PropTypes.array,
};

export function MovieDetails({
  watched,
  selectedId,
  onCloseMovie,
  onAddWatched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');
  const [error, setError] = useState('');

  const {
    Title: title,
    Poster: poster,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const isWatched = watched.findIndex((item) => item.imdbID === selectedId) !== -1;

  const watchedUserRating = watched.find(item => item.imdbID === selectedId)?.userRating;


  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating,
      runtime: runtime.split(' ').at(0),
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    const getMovieDetails = async () => {
      setError('');
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}?apikey=${
            import.meta.env.VITE_API_KEY
          }&i=${selectedId}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Failed to fetch movie details.');
        }
        setMovie(data);
        setError('');
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [selectedId]);

  return (
    <div className='details'>
      {isLoading && !error && <Loader />}
      {!isLoading && !error && (
        <>
          <header>
            <button className='btn-back' onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className='details-overview'>
              <h2> {title} </h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className='rating'>
              {!isWatched && (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 &&
                    <button className='btn-add' onClick={handleAdd}>
                      + ADD TO LIST
                    </button>
                  }
                </>
              )}

              {isWatched && <p>You rated this movie with {watchedUserRating} <span>⭐</span></p>}
            </div>
            <p>
              <em> {plot} </em>
            </p>
            <p> Starring {actors} </p>
            <p> Directed by {director} </p>
          </section>
        </>
      )}
      {!isLoading && error && <ErrorMessage message={error} />}
    </div>
  );
}
