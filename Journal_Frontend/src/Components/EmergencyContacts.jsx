import React, { useState,useEffect } from "react";
import "./css/EmergencyContacts.css";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

const EmergencyContacts = ({searchQuery}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [txt, setTxt] = useState("");
  const [show, setShow] = useState(false);
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
      try {
        const response = await axios.get("https://health-journal.onrender.com/getcontactcards");
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching symptoms:", error);
      }
    };
  
    useEffect(() => {
      fetchContacts();
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newContact = { name, phone, txt };
    try {
      const response = await axios.post("https://health-journal.onrender.com/addcontactcard", newContact);
      fetchContacts(); 
      setShow(false);
      setName("");
      setPhone("");
      setTxt("");
    } catch (error) {
      console.error("Error adding contacts:", error);
    }  
  };
  const filteredList = contacts.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>

      <div className="emergency-container">
        <h2>Emergency Contacts</h2>
        <button onClick={() => setShow(true)} className="contact-add-btn">
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
