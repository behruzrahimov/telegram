import { MessageHeader } from "./message-header/Message-header.component";
import { MessageInput } from "./message-input/Message-input.component";
import { MessageShow } from "./messageShow/message-show.component";
import "./rightBar.css";
import { useState } from "react";

export default function RightBar({ contact }) {
  const [dateMessage, setDateMessage] = useState(0);

  return (
    <div className="right_bar">
      {contact ? (
        <div className="message">
          <MessageHeader contact={contact} />
          <MessageShow contact={contact} DateMessage={dateMessage} />
          <MessageInput contact={contact} />
        </div>
      ) : (
        <div className="select_contact_container">
          <p className="select_contact">Выберите, кому хотели бы написать</p>
        </div>
      )}
    </div>
  );
}
