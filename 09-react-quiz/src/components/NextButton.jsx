import React from "react";

function NextButton({ dispatch, answer, index, numQuestions }) {
  return (
    <div>
      {index < numQuestions - 1 ? (
        answer !== null ? (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "newQuestion" })}
          >
            Next
          </button>
        ) : (
          ""
        )
      ) : answer !== null ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "submit" })}
        >
          Submit
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default NextButton;
