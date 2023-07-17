import { useEffect, useState } from "react";

export function useMovies(query, callback) {
  
  const [movies, setMovies] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');


  useEffect(() => {
    callback?.();
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setError('');
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}?apikey=${
            import.meta.env.VITE_API_KEY
          }&s=${query}`,
          { signal: controller.signal }
        );

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
        if (error.name !== 'AbortError') {
          setError(error.message);
        }
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

    return function () {
      controller.abort();
    };
  }, [query, callback]);

  return {  movies, error, isLoading}
}
