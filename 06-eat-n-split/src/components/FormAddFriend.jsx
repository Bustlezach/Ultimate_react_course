import React, { useState } from "react";
import Button from "./Button";

function FormAddFriend({
  friendName,
  setFriendName,
  friendImage,
  setFriendImage,
  handleAddFriend,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!friendName || !friendImage) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name: friendName,
      image: `${friendImage}?=${id}`,
      balance: 0,
    };
    handleAddFriend(newFriend);
    setFriendName("");
    setFriendImage("https://i.pravatar.cc/48");
  };
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👨🏿‍🤝‍👨🏼 Friend name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />
      <label>👨🏿 Image URL</label>
      <input
        type="text"
        value={friendImage}
        onChange={(e) => setFriendImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

export default FormAddFriend;
