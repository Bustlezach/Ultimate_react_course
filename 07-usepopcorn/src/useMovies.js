import { useState, useEffect } from "react";

export function useMovies(query, KEY, callback) {
  const [movies, setMovies] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      callback?.();
      try {
        setIsLoading(true);
        setError("");
        const url = `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok)
          throw new Error("Something went wrong while loading movies.");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found!");
        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);
  return { movies, isLoading, error };
}
