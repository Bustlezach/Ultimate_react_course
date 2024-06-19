import React, { useState } from "react";
// import { initialItems } from "../data";

function PackingList({ initialItems, handlePacked, handleDelete, handleClearList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = initialItems;
  if (sortBy === "description")
    sortedItems = initialItems
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = initialItems
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  const items = sortedItems.map((item) => (
    <li key={item.description}>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handlePacked(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDelete(item.id)}>❌</button>
    </li>
  ));

  return (
    <div className="list">
      <ul>
        {initialItems.length === 0 ? (
          <p>Your packing list is empty</p>
        ) : (
          items
        )}
      </ul>
      <div className="actions">
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option value="input">Sort by the input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={handleClearList}>Clear list</button>
      </div>
    </div>
  );
}

export default PackingList;
