import { data } from "./data";
import Button from "./components/Button";
import Friends from "./components/Friends";
import { useState } from "react";
import FormAddFriend from "./components/FormAddFriend";
import FormSplitBill from "./components/FormSplitBill";

function App() {
  // friends store all the info of friends
  const [friends, setFriends] = useState(data);
  // showFormAddFriend is the state to toggle the add friend form
  const [showFormAddFriend, setShowFormAddFriend] = useState(false);

  // Stores the info of new friend to be added
  const [friendName, setFriendName] = useState("");
  const [friendImage, setFriendImage] = useState("https://i.pravatar.cc/48");

  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowAddFriendBtn = () => {
    setShowFormAddFriend((prev) => !prev);
    setSelectedFriend(null);
  };

  const handleAddFriend = (newFriend) => {
    setFriends((prev) => [...prev, newFriend]);
    setShowFormAddFriend(false);
  };

  const handleSelectedFriend = (friend) => {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowFormAddFriend(false);
  };

  function handleSplitBill(value) {
    setFriends(friends.map(fr => fr.id === selectedFriend.id ? {...fr, balance: fr.balance + value}: fr));
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <Friends
          friends={friends}
          selectedFriend={selectedFriend}
          handleSelectedFriend={handleSelectedFriend}
        />

        {showFormAddFriend && (
          <FormAddFriend
            friendName={friendName}
            friendImage={friendImage}
            setFriendName={setFriendName}
            setFriendImage={setFriendImage}
            handleAddFriend={handleAddFriend}
          />
        )}

        <Button onClick={handleShowAddFriendBtn}>
          {showFormAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          handleSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

export default App;
