import React from "react";

function Stat({ items }) {
  const len = items.length;

  const packedNum = items.filter((item) => item.packed);

  const percentage = Math.round((packedNum.length / len) * 100);
  return (
    <footer className="stats">
      <em>
        😎 You have {len === 0 ? "empty" : len} {len > 1 ? "items" : "item"} on
        your list, and you already packed {packedNum.length} (
        {isNaN(percentage) ? "X" : percentage}%)
      </em>
    </footer>
  );
}

export default Stat;
