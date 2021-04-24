import React, { useState } from "react";
import Picker from "emoji-picker-react";

const App = (props) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    props.chooseemoji(emojiObject.emoji);
  };

  return (
    <div>
      <Picker disableSkinTonePicker='True' onEmojiClick={onEmojiClick} />
    </div>
  );
};
export default App;