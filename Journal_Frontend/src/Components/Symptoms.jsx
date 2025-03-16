import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Symptoms.css";
import { IoMdClose, IoMdDoneAll } from "react-icons/io";

const Symptoms = ({ searchQuery }) => {
  const [symptom, setSymptom] = useState("");
  const [severity, setSeverity] = useState("Mild");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);

  

  const fetchSymptoms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getsymptomscards");
      setList(response.data);
    } catch (error) {
      console.error("Error fetching symptoms:", error);
    }
  };

  useEffect(() => {
    fetchSymptoms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      symptom,
      severity,
      duration: Number(duration), 
      notes
    };

    try {
      const response = await axios.post("http://localhost:5000/addsymptomcard", data);
      fetchSymptoms(); 
      setSubmitted(true);
      setShow(false);
      setSymptom("");
      setSeverity("Mild");
      setDuration("");
      setNotes("");

      setTimeout(() => {
        setSubmitted(false);
      }, 1000);
    } catch (error) {
      console.error("Error adding symptom:", error);
    }
  };

  const filteredList = list.filter((item) =>
    item.symptom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="symptoms-container">
      <h2>Symptom Logs</h2>
      <button onClick={() => setShow(true)} className="symptoms-add-btn">
        Add New Symptom
      </button>

      <div className="symptoms-grid">
        {filteredList.length === 0 ? (
          <p>No symptoms logged yet.</p>
        ) : (
          filteredList.map((item) => (
            <div key={item._id} className="symptom-card">
              <h3>{item.symptom}</h3>
              <p><strong>Severity:</strong> {item.severity}</p>
              <p><strong>Duration:</strong> {item.duration} days</p>
              <p><strong>Notes:</strong> {item.notes || "None"}</p>
              <p><small>Logged on: {item.date}</small></p>
            </div>
          ))
        )}
      </div>

      {show && (
        <div className="symptoms-form-popup">
          <div className="symptoms-form-container">
            <button className="symptoms-close-btn" onClick={() => setShow(false)}>
              <IoMdClose />
            </button>
            <h2>Log Your Symptoms</h2>
            {submitted && (
              <p className="symptoms-success-message">
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
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duration in days"
                required
              />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional Information"
              ></textarea>
              <button type="submit" className="symptoms-log-btn">
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






