import { useEffect, useState } from "react";
import "./message_input.css";
export function MessageInput({ contact }) {
  const [MessageInputText, setMessageInputText] = useState("");
  const [count, setCount] = useState(0);

  const draft = localStorage.getItem("draft");
  const drafts = draft ? JSON.parse(draft) : [];

  useEffect(() => {
    const currentDraft = drafts.find((draft) => draft.id === contact.id);
    setMessageInputText(currentDraft ? currentDraft.text : "");
  }, [contact]);

  useEffect(() => {
    if (count === 0) return;
    if (MessageInputText === "") {
      drafts.forEach((draft) => {
        if (draft.id === contact.id) {
          draft.text = "";
        }
      });
    }
    localStorage.setItem("draft", JSON.stringify(drafts));
  }, [count]);

  const onChangeText = (e) => {
    const value = e.target.value;
    setMessageInputText(value);

    const draftFind = drafts.find((draft) => {
      return draft.id === contact.id;
    });

    if (draftFind) {
      draftFind.text = value;
    } else {
      drafts.push({
        id: contact.id,
        text: value,
      });
    }
    localStorage.setItem("draft", JSON.stringify(drafts));
  };

  const sendMessage = (e) => {
    if (MessageInputText.trim()) {
      fetch(`http://192.168.43.199:5000/messages-save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: MessageInputText,
          sender: 1000,
          receiver: contact.id,
        }),
      });

      setMessageInputText("");
    } else {
      e && e.preventDefault();
    }
    setCount(count + 1);
  };

  const onKeyPressFunc = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="message-input">
      <div className="icon-attachment"></div>
      <input
        onChange={onChangeText}
        onKeyPress={onKeyPressFunc}
        type="text"
        placeholder="Написать сообщение..."
        value={MessageInputText ? MessageInputText : ""}
      />
      <div className="icon-smile-o"></div>
      <button
        className={MessageInputText ? "icon-send" : "icon-keyboard_voice"}
        style={
          !MessageInputText
            ? { fontSize: "30px", transition: "all .05s linear" }
            : null
        }
        onClick={sendMessage}
      ></button>
    </div>
  );
}
