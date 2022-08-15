import { useState } from "react";
import "./leftBar.css";
import Navbar from "./Navbar/Navbar";
import Contacts from "./Contacts/Contacts";
import { AddContact } from "./Navbar/Addcontatcts/AddContacts";

export default function LeftBar({ contact }) {
  const [menuModal, setMenuModal] = useState(false);
  const [modalContact, setModalContact] = useState(false);
  const onModalActive = () => {
    setMenuModal(true);
  };

  const modalContactActive = (e) => {
    setModalContact(e);
  };

  const modalHandler = (e) => {
    setMenuModal(e);
  };
  return (
    <div className="left_bar">
      <div className="header_left_bar">
        <div className="menu_bar" onClick={onModalActive}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
        <div className="search">
          <input type="text" placeholder="Поиск" />
        </div>
      </div>
      {/* Menu Bar */}
      <Navbar
        modal={menuModal}
        modalContactActive={modalContactActive}
        modalHandler={modalHandler}
      />
      <AddContact
        modalContactHandler={() => setModalContact(!modalContact)}
        modalContact={modalContact}
        modalContactActive={modalContactActive}
        callContact={contact}
      />
      {/*users*/}
      <Contacts callContact={contact} />
    </div>
  );
}
