import { useState } from "react";
import StarRatings from "./StarRatings";

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRatings onSetRating={setMovieRating} color="blue" />
      <p>This movie is rated {movieRating} stars.</p>
    </div>
  );
}

function App() {
  return (
    <>
      <StarRatings maxRating={7} className="test" defaultRating={3} />
      <StarRatings
        maxRating={10}
        size={24}
        color="red"
      />
      <StarRatings
        color="black"
        messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      />
      <Test />
    </>
  );
}

export default App;
