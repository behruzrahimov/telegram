import "./message_show.css";
import { useEffect } from "react";
import { useState } from "react";

export function MessageShow({ contact }) {
  const [messages, setMessages] = useState();

  useEffect(() => {
    //get messages with async Function
    const rotationInterval = setInterval(() => {
      async function getMessages() {
        const url = await fetch("http://192.168.43.199:5000/messages-list");
        const response = await url.json();
        setMessages(response);
      }
      getMessages();
    }, 1000);
    return () => {
      clearInterval(rotationInterval);
    };
    //get messages without async function
    // fetch("http://192.168.4.126:5000/messages-list")
    //   .then((response) => response.json())
    //   .then((data) => setMessages(data));
  }, []);

  let cnt = 0;

  return (
    <div className="message-show">
      {messages &&
        messages.map((e, index) => (
          <div className="message_index" key={index}>
            {e.receiver === contact.id || e.sender === contact.id ? (
              <div
                className="container_messages"
                style={
                  e.receiver === 1000
                    ? { justifyContent: "" }
                    : { justifyContent: "flex-end" }
                }
              >
                <p style={{ display: "none" }}>{cnt++}</p>
                {e.sender === contact.id ? (
                  <div className="message_show_list">
                    <p
                      style={{
                        backgroundColor: "black",
                      }}
                      className="user_message_img"
                    >
                      {contact.name[0]}
                    </p>
                    <p className="message_text">{e.text}</p>
                  </div>
                ) : (
                  <div className="message_show_list">
                    <p className="message_text">{e.text}</p>
                    <p
                      style={{
                        backgroundImage:
                          " linear-gradient(to top, #4b4bb9 10%, #4747d0 100%)",
                      }}
                      className="user_message_img"
                    >
                      <span className="icon-user"></span>
                    </p>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        ))}
      {!cnt && (
        <div className="no_message">
          <p>Напишите сообщение...</p>
        </div>
      )}
    </div>
  );
}
