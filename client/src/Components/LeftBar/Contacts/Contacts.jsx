import "./contacts.css";
import { useState } from "react";
import { useEffect } from "react";

export default function Contacts({ callContact }) {
  const [contact, setContact] = useState([]);

  //get contacts with async function
  useEffect(() => {
    async function getContacts() {
      const url = await fetch("http://192.168.43.199:5000/contact-list");
      const response = await url.json();
      setContact(response);
    }
    getContacts();
    // fetch("http://localhost:5000/contact-list")
    //     .then((response) => response.json())
    //     .then((contacts) => setContact(contacts));
  }, [callContact]);

  const draft = localStorage.getItem("draft");
  const drafts = draft ? JSON.parse(draft) : [];

  return (
    <div className="users">
      {contact.map((user) => (
        <div
          className="user"
          key={user.id}
          onClick={() => {
            callContact(user);
          }}
        >
          <div className="icon_users">
            <span className="icon_user">{user.name[0]}</span>
          </div>
          <div className="name_surname_black">
            <div className="name_surname">
              {user.name} {user.surname}
            </div>

            {drafts.map(
              (draft, i) =>
                draft.text &&
                draft.id === user.id && (
                  <div key={i} className="black_table">
                    <div>
                      <span style={{ color: "gray", fontSize: "12px" }}>
                        Draft :
                      </span>
                      <span style={{ color: "gray", fontSize: "12px" }}>
                        {" "}
                        {draft.text}
                      </span>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
