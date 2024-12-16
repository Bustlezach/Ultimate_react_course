import React, { Fragment, useState } from "react";
import Button from "./Button";
import StepMessage from "./StepMessage";

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
  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      setStep(1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      setStep(3);
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
          <StepMessage step={step}>{messages[step - 1]}</StepMessage>
          <div className="buttons">
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              <span>👈</span>Previous
            </Button>
            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              Next<span>👉</span>
            </Button>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}

export default App;
