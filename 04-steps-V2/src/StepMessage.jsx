import React from "react";

function StepMessage({ children, step }) {
  return (
    <div className="message">
      <h3>Step {step}:</h3> {/*{messages[step - 1]}*/}
      {children}
    </div>
  );
}

export default StepMessage;
