import React, { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

function App() {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleDescription = (event) => {
    const { value } = event.target;
    setDescription(value);
  };
  const handleQuantity = (event) => {
    const { value } = event.target;
    setQuantity(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!description) return;
    const newItem = { id: Date.now(), description, quantity, packed: false };
    setItems((prev) => [...prev, newItem]);
    setDescription("");
    setQuantity(1);
  };

  const handlePacked = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handleClearList = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all items?"
    );
    if (confirmed) setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form
        handleSubmit={handleSubmit}
        handleQuantity={handleQuantity}
        quantity={quantity}
        description={description}
        handleDescription={handleDescription}
      />
      <PackingList
        initialItems={items}
        handlePacked={handlePacked}
        handleDelete={handleDelete}
        handleClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
