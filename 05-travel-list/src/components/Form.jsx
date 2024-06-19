import React from "react";

function Form({
  handleSubmit,
  handleQuantity,
  quantity,
  description,
  handleDescription,
}) {
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select onChange={handleQuantity} value={quantity}>
        {/* <option value="" default>
          --
        </option> */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={handleDescription}
      />
      <button>Add</button>
    </form>
  );
}

export default Form;
