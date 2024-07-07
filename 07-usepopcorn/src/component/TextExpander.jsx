import React, { useState } from "react";
import PropTypes from "prop-types";

function TextExpander({
  children,
  collapseButtonText = "Show less",
  className,
  buttonColor = "blue",
  collapsedNumWords = 10,
  expandButtonText = "Show more",
  expanded = false,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const handleClick = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div className={className}>
      {isExpanded
        ? children 
        : children.split(" ").slice(0, collapsedNumWords).join(" ") + "... "}
      <span
        onClick={handleClick}
        style={{ color: buttonColor, cursor: "pointer", marginLeft: "6px" }}
      >
        {isExpanded ? collapseButtonText : expandButtonText}
      </span>
    </div>
  );
}

export default TextExpander;

TextExpander.propTypes = {
  collapsedNumWords: PropTypes.number,
  expandButtonText: PropTypes.string,
  collapseButtonText: PropTypes.string,
  buttonColor: PropTypes.string,
  className: PropTypes.string,
  expanded: PropTypes.bool,
};
