import React from "react";

function FinishScreen({ points, maxPoints, highscore, dispatch }) {
  const percentage = Number((points / maxPoints) * 100);
  return (
    <>
      <p className="result">
        You score {points} out of {maxPoints} (
        {percentage ? Math.ceil(percentage) + "%" : ""})
      </p>
      <p className="highscore">(Highscore: {highscore})</p>
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: "restart",
          })
        }
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
