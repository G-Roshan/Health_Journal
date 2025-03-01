import React, { useState, useEffect } from "react";
import "./css/Symptoms.css";
import { IoMdClose } from "react-icons/io";
import { IoMdDoneAll } from "react-icons/io";

const Symptoms = () => {
  const [symptom, setSymptom] = useState("");
  const [severity, setSeverity] = useState("Mild");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      symptom,
      severity,
      duration,
      notes,
      date: new Date().toLocaleString(),
    };

    const updatedSymptoms = [...list, data];
    setList(updatedSymptoms);

    setSubmitted(true);
    setShow(false);
    setSymptom("");
    setSeverity("Mild");
    setDuration("");
    setNotes("");

    setTimeout(() => {
      setSubmitted(false);
    }, 1000);
  };

  return (
    <div className="symptoms-container">
      <h2>Symptom Logs</h2>
      <button onClick={() => setShow(true)} className="add-btn">
        Add New Symptom
      </button>
      <div className="symptoms-grid">
        {list.length === 0 ? (
          <p>No symptoms logged yet.</p>
        ) : (
          list.map((item, index) => (
            <div key={index} className="symptom-card">
              <h3>{item.symptom}</h3>
              <p>
                <strong>Severity:</strong> {item.severity}
              </p>
              <p>
                <strong>Duration:</strong> {item.duration} days
              </p>
              <p>
                <strong>Notes:</strong> {item.notes || "None"}
              </p>
              <p>
                <small>Logged on: {item.date}</small>
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
            <h2>Log Your Symptoms</h2>
            {submitted && (
              <p className="success-message">
                Symptom logged successfully! <IoMdDoneAll />
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                placeholder="Symptom name"
                required
              />
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
              >
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
              </select>
              
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Since when"
                required
              />

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional Information"
              ></textarea>

              <button type="submit" className="log-btn">
                Log Symptom
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Symptoms;
