import React from "react";
import Friend from "./Friend";

function Friends({ friends, handleSelectedFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          name={friend.name}
          image={friend.image}
          id={friend.id}
          balance={friend.balance}
          selectedFriend={selectedFriend}
          handleSelectedFriend={handleSelectedFriend}
        />
      ))}
    </ul>
  );
}

export default Friends;
