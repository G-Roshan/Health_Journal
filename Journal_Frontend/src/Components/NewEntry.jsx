import React, { useState,useEffect } from "react";
import "./css/NewEntry.css";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

const NewEntry = ({searchQuery}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);
  
  const fetchNewentries = async () => {
    try {
      const response = await axios.get("https://health-journal.onrender.com/getnewentrycards");
      setList(response.data);
    } catch (error) {
      console.error("Error fetching symptoms:", error);
    }
  };

  useEffect(() => {
    fetchNewentries();
  }, []);

  const handleSubmit =async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      loggedAt: new Date().toLocaleString(),
    };
   try {
      const response = await axios.post("https://health-journal.onrender.com/addnewentrycard", data);
      fetchNewentries(); 
      setShow(false);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding newentries:", error);
    }  
  };
  const filteredList = list.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <div className="newentry-container">
        <h2>New Entries</h2>
        <button onClick={() => setShow(true)} className="newentry-add-btn">
          Add New Entry
        </button>
        <div className="entries-grid">
          {filteredList.length === 0 ? (
            <p>No entries logged yet.</p>
          ) : (
            filteredList.map((item, index) => (
              <div key={index} className="entry-card">
                <h3>{item.title}</h3>
                <p>
                  <strong>Description:</strong>{" "}
                  {item.description || "Not specified"}
                </p>
                <p>
                  <small>Logged on: {item.loggedAt}</small>
                </p>
              </div>
            ))
          )}
        </div>
        {show && (
          <div className="newentry-form-popup">
            <div className="newentry-form-container">
              <button className="newentry-close-btn" onClick={() => setShow(false)}>
                <IoMdClose />
              </button>
              <h2>Log Your Entry</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Entry Title"
                  required
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your symptoms or medical notes"
                ></textarea>
                <button type="submit" className="log-btn">
                  Log Entry
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewEntry;
