import React, { useState } from "react";
import "./css/EmergencyContacts.css";
import { IoMdClose } from "react-icons/io";

const EmergencyContacts = ({searchQuery}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [txt, setTxt] = useState("");
  const [show, setShow] = useState(false);
  const [contacts, setContacts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = { name, phone, txt };

    setContacts([...contacts, newContact]);
    setShow(false);
    setName("");
    setPhone("");
    setTxt("");
  };
  const filteredList = contacts.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>

      <div className="emergency-container">
        <h2>Emergency Contacts</h2>
        <button onClick={() => setShow(true)} className="add-btn">
          Add Contact
        </button>

        <div className="contacts-grid">
          {filteredList .length === 0 ? (
            <p>No emergency contacts added yet.</p>
          ) : (
            filteredList.map((contact, index) => (
              <div key={index} className="contact-card">
                <h3>{contact.name}</h3>
                
                <p>
                  <strong>Phone:</strong> {contact.phone}
                </p>
                <p>
                  <strong>Reason:</strong> {contact.txt}
                </p>
              </div>
            ))
          )}
        </div>

        {show && (
          <div className="form-popup">
            <div className="form-container">
              <button className="close-btn" onClick={() => setShow(false)}>
                <IoMdClose />
              </button>
              <h2>Add Emergency Contact</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contact : Hospital Name"
                  required
                />
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  required
                />
                <input
                  type="text"
                  value={txt}
                  onChange={(e) => setTxt(e.target.value)}
                  placeholder="Reason"
                />
                <button type="submit" className="log-btn">
                  Save Contact
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyContacts;
