import React, { useState } from "react";
import "./css/NewEntry.css";
import { IoMdClose } from "react-icons/io";
import Navbar from "./Navbar";

const NewEntry = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      loggedAt: new Date().toLocaleString(),
    };

    setList([...list, data]);
    setSubmitted(true);
    setShow(false);
    setTitle("");
    setDescription("");

    setTimeout(() => {
      setSubmitted(false);
    }, 1000);
  };

  return (
    <div>
      <Navbar />

      <div className="newentry-container">
        <h2>New Entries</h2>
        <button onClick={() => setShow(true)} className="add-btn">
          Add New Entry
        </button>
        <div className="entries-grid">
          {list.length === 0 ? (
            <p>No entries logged yet.</p>
          ) : (
            list.map((item, index) => (
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
          <div className="form-popup">
            <div className="form-container">
              <button className="close-btn" onClick={() => setShow(false)}>
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
