import React, { Fragment, useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const handleIsopen = () => {
    setIsOpen((prev) => !prev);
  };
  const [step, setStep] = useState(1);
  const handleClick = (event) => {
    const { value } = event.target;
    if (value === "Next") {
      if (step < 3) {
        setStep((prev) => prev + 1);
      } else {
        setStep(1);
      }
    } else {
      if (step > 1) {
        setStep((prev) => prev - 1);
      } else {
        setStep(3);
      }
    }
  };

  return (
    <Fragment>
      <button className="close" onClick={handleIsopen}>
        &times;
      </button>
      {isOpen ? (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : null}>1</div>
            <div className={step >= 2 ? "active" : null}>2</div>
            <div className={step >= 3 ? "active" : null}>3</div>
          </div>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <button
              value="Previous"
              onClick={handleClick}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              Previous
            </button>
            <button
              value="Next"
              onClick={handleClick}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}

export default App;
