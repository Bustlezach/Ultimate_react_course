import React from "react";

function Stat({ items }) {
  const itemsLen = items.length;

  const packedNum = items.filter((item) => item.packed);

  const percentage = Math.round((packedNum.length / itemsLen) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈"
          : `😎 You have ${itemsLen === 0 ? "empty" : itemsLen} ${
              itemsLen > 1 ? "items" : "item"
            } on
        your list, and you already packed ${packedNum.length} (
        ${isNaN(percentage) ? "X" : percentage}%)`}
      </em>
    </footer>
  );
}

export default Stat;
