import { useState } from "react";
import "./App.css";
import LeftBar from "./Components/LeftBar/LeftBar";
import RightBar from "./Components/RightBar/RightBar";

export default function App() {
  const [contact, setContact] = useState(null);

  const callContact = (e) => {
    setContact(e);
  };

 
  return (
    <div className="App">
      <div className="all_conatiner">
        <LeftBar contact={callContact}/>
        <RightBar contact={contact}/>
      </div>
    </div>
  );
}
