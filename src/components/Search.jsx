import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { useKey } from '../hooks/useKey';

export function Search({ query, onQuery }) {

  const searchRef = useRef(null);

  useEffect(() => {
      searchRef.current.focus();
  }, [])

  useKey('Enter', function(){
    if(document.activeElement === searchRef.current) return;

    searchRef.current.focus();
    onQuery('');
  })

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