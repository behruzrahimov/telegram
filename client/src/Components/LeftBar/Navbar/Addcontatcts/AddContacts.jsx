import "./addcontact.css";
import { useState } from "react";
import { useEffect } from "react";

export function AddContact({
  modalContact,
  modalContactHandler,
  modalContactActive,
  callContact,
}) {
  const [addAcActive, setAddAcActive] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const onNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const [contact, setContact] = useState([]);

  //get contacts with async function
  async function getContacts() {
    const url = await fetch("http://192.168.43.199:5000/contact-list");
    const response = await url.json();
    setContact(response);
  }

  useEffect(() => {
    // fetch("http://192.168.4.126:5000/contact-list")
    //   .then((response) => response.json())
    //   .then((contacts) => setContact(contacts));
    getContacts();
  }, [callContact]);

  const addContact = (e) => {
    if (name.trim() && surname.trim() && number.trim()) {
      fetch(`http://192.168.43.199:5000/contact-save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name,
          surname: surname,
          number: number,
        }),
      });
      setName("");
      setSurname("");
      setNumber("");

      callContact({
        id: Date.now(),
        name: name,
        surname: surname,
        number: number,
      });

      setAddAcActive(false);
      modalContactActive(false);
    } else {
      e && e.perventDefault();
    }
  };
  const addAcActiveFunc = () => {
    setAddAcActive(true);
  };

  const backToContacts = () => {
    setAddAcActive(false);
  };

  return (
    <div
      className={`contacts_add${modalContact ? " active" : ""}`}
      onClick={modalContactHandler}
    >
      {!addAcActive ? (
        <div
          className="conatct_modal_container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="header_conatct_modal_container">
            <div className="contact_search">
              <p className="text_contact">Контакты</p>
              <p className="search_text">
                <span className="icon-search"></span>
                <input type="text" placeholder="Поиск" />
              </p>
            </div>
          </div>

          <div className="main_container_contact_modal">
            {contact.map((user, index) => (
              <div
                key={index}
                className="user_contact_modal_link"
                onClick={() => {
                  callContact(user);
                  modalContactActive(false);
                }}
              >
                <div className="img_contact_modal">
                  <p>{user.name[0]}</p>
                </div>
                <p className="name_conatct_modal">
                  {user.name} {user.surname}
                </p>
              </div>
            ))}
          </div>

          <div className="footer_container_contact_modal">
            <button onClick={addAcActiveFunc}>Добавить контакт</button>
            <button onClick={modalContactHandler}>Закрыть</button>
          </div>
        </div>
      ) : (
        <div
          className="conatct_add_modal_container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="header_conatct_add_modal_container">
            <div className="add_conatct">
              <p>Новый контакт</p>
            </div>
          </div>

          <div className="main_add_contacts">
            <div className="name_user_add_contacts">
              <input
                type="text"
                placeholder="Имя"
                onChange={onNameChange}
                value={name}
              />
            </div>
            <div className="surname_user_add_contacts">
              <input
                type="text"
                placeholder="Фамилия"
                onChange={onSurnameChange}
                value={surname}
              />
            </div>
            <div className="number_user_add_contacts">
              <input
                type="text"
                placeholder="Номер телефон"
                onChange={onNumberChange}
                value={number}
              />
            </div>
          </div>

          <div className="footer_add_acaunt">
            <button onClick={backToContacts}>Отмена</button>
            <button onClick={addContact}>Добавить</button>
          </div>
        </div>
      )}
    </div>
  );
}
