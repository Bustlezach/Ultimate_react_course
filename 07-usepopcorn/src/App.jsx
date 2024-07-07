import { useState } from "react";
import { tempMovieData, tempWatchedData } from "../data";
import NavBar from "./component/NavBar";
import Main from "./component/Main";
import Result from "./component/Result";
import SearchBar from "./component/SearchBar";
import Box from "./component/Box";
import Movies from "./component/Movies";
import WatchedSummary from "./component/WatchedSummary";
import WatchedList from "./component/WatchedList";

function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  return (
    <>
      <NavBar>
        <SearchBar />
        <Result movies={movies} />
      </NavBar>
      <Main>
        <Box>
          <Movies movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

export default App;
