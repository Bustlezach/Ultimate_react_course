import React, { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

function App() {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  // const [packed, setPacked] = useState(false);

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
    const newItem = { description, quantity, packed: false };
    setItems((prev) => [...prev, newItem]);
    setDescription("");
    setQuantity("");
  };

  const handlePacked = (desc) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.description === desc ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleDelete = (desc) => {
    const newItems = items.filter((item) => item.description != desc);
    setItems(newItems);
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
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
