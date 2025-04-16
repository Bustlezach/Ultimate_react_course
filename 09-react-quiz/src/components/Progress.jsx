import React from "react";

function Progress({ answer, status, index, numQuestions, points, maxPoints }) {
  return (
    <header className="progress">
      {status === "active" ? (
        <>
          <progress
            value={index + Number(answer !== null)}
            max={numQuestions}
          ></progress>
          <p>
            Question <strong>{index + 1}</strong>/{numQuestions}
          </p>
          <p>
            <strong>{points}</strong>/{maxPoints}
          </p>
        </>
      ) : (
        ""
      )}
    </header>
  );
}

export default Progress;
