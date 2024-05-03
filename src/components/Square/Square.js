import React from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      data-testid="square-button"
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default Square;
