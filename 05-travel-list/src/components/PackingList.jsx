import React from "react";
// import { initialItems } from "../data";

function PackingList({ initialItems, handlePacked, handleDelete }) {
  const items = initialItems.map((item) => (
    <li key={item.description}>
      <input type="checkbox" onClick={() => handleDelete(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handlePacked(item.id)}>❌</button>
    </li>
  ));
  return (
    <div className="list">
      <ul>
        {initialItems.length === 0 ? (
          <p>Your traveling baggage is empty</p>
        ) : (
          items
        )}
      </ul>
    </div>
  );
}

export default PackingList;
