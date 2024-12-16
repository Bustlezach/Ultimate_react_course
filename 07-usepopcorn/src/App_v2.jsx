import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRatings";
import { useMovies } from "./useMovies";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0).toFixed(1);

const KEY = `556d0618`;

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔ </span>
      {message}
    </p>
  );
}

function MovieList({ movies, onSelectedMovie }) {
  return (
    <>
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie
            movie={movie}
            onSelectedMovie={onSelectedMovie}
            key={movie.imdbID}
          />
        ))}
      </ul>
    </>
  );
}

function Movie({ movie, onSelectedMovie }) {
  return (
    <li onClick={() => onSelectedMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating ? avgImdbRating : ""}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating ? avgUserRating : ""}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovie({ movie, onDelete }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating ? movie.imdbRating : ""}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={() => onDelete(movie.imdbID)}>
          X
        </button>
      </div>
    </li>
  );
}

function WatchedMovieList({ watched, onDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} onDelete={onDelete} />
      ))}
    </ul>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

export default function App() {
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(retrieveWatched);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectedMovieId = (movieId) => {
    setSelectedId((selectedId) => (selectedId === movieId ? null : movieId));
  };

  const handleCloseSelectedMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((prev) => [...prev, movie]);
  };

  const handleDeleteWatchedMovie = (movieId) => {
    const newWatchedMovies = watched.filter(
      (movie) => movie.imdbID !== movieId
    );
    setWatched(newWatchedMovies);
  };

  function retrieveWatched() {
    const storedWatched = localStorage.getItem("watched");
    return JSON.parse(storedWatched);
  }

  const {movies, isLoading, error} = useMovies(query, KEY, handleCloseSelectedMovie)

  /* useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      handleCloseSelectedMovie();
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
  }, [query]); */

  useEffect(
    function () {
      function saveWatched() {
        localStorage.setItem("watched", JSON.stringify(watched));
      }

      saveWatched();
    },
    [watched]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <main className="main">
        {!isLoading && !error && (
          <Box>
            <MovieList
              movies={movies}
              onSelectedMovie={handleSelectedMovieId}
            />
          </Box>
        )}
        {error && <ErrorMessage message={error} />}
        {isLoading && <Loader />}

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseSelectedMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDelete={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </main>
    </>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  const inputElement = useRef(null);

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  useEffect(() => {
    const callback = (e) => {
      if (e.code === "Enter") {
        if (document.activeElement === inputElement.current) return;
        setQuery("");
        inputElement.current.focus();
      }
    };
    document.addEventListener("keydown", callback);
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies ? movies.length : 0}</strong> results
    </p>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);

  

  const isWatched = watched
    .map((watchedMovie) => watchedMovie.imdbID)
    .includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onCloseMovie();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onCloseMovie]);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const url = `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`;
        const res = await fetch(url);
        if (!res.ok)
          throw new Error("Something got wrong while fetching movie.");
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetails();
  }, [selectedId]);

  useEffect(
    function () {
      const updateTitle = () => {
        if (!title) return;
        document.title = `Movie | ${title}`;
      };
      updateTitle();
      return function () {
        document.title = `usePopcorn`;
      };
    },
    [title]
  );

  useEffect(() => {
    const userMovieRatingDecision = () => {
      if (userRating) countRef.current += 1;
    };
    userMovieRatingDecision();
  }, [userRating]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
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
            <p>
              <em>{plot}</em>
            </p>
          </section>
          <div className="rating">
            {!isWatched ? (
              <>
                <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                />
                {userRating > 0 && (
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to list
                  </button>
                )}
              </>
            ) : (
              <p>You have rated this movie {watchedUserRating}.</p>
            )}
          </div>

          <p>Starring {actors}</p>
          <p>Directed by {director}</p>
          <p>Year {year}</p>
        </>
      )}
    </div>
  );
}
