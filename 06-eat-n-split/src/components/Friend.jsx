import React from "react";
import Button from "./Button";

function Friend({
  name,
  image,
  balance,
  id,
  selectedFriend,
  handleSelectedFriend,
}) {
  const person = { id, name, image, balance };
  const isSelected = person.id === selectedFriend?.id;
  return (
    <li key={id} className={isSelected?"selected":""}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {balance < 0 && (
        <p className="red">
          You owe {name} ${Math.abs(balance)}
        </p>
      )}
      {balance > 0 && (
        <p className="green">
          {name} owes you ${Math.abs(balance)}
        </p>
      )}
      {balance === 0 && <p>You and {name} are even</p>}
      <Button onClick={() => handleSelectedFriend(person)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

export default Friend;
