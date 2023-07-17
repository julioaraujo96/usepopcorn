import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

export function Search({ query, onQuery }) {

  const searchRef = useRef(null);

  useEffect(() => {
      searchRef.current.focus();
  }, [])

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => onQuery(e.target.value)} 
      ref={searchRef}
      />
  );
}

Search.propTypes = {
  query: PropTypes.string,
  onQuery: PropTypes.func,
}