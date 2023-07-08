import { WatchedMovie } from './WatchedMovie';
import PropTypes from 'prop-types';

WatchedMoviesList.propTypes = {
  watched: PropTypes.array,
  onDeleteWatched: PropTypes.func,
}

export function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched} />
      ))}
    </ul>
  );
}
