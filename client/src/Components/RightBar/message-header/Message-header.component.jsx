import "./message_header.css";

export function MessageHeader({ contact }) {
  return (
    <div className="message_header">
      <div className="message_users">
        <div className="user_img">
          <p>{contact.name[0]}</p> <p> {contact.surname[0]}</p>
        </div>
        <div className="user_name">
          <p>
            {contact.name} {contact.surname}
          </p>
          <p style={{ fontSize: "14px", color: "aqua" }}>в сети</p>
        </div>
      </div>
      <div className="call">
        <div className="icon-phone"></div>
        <div className="icon-video-camera"></div>
      </div>
    </div>
  );
}
