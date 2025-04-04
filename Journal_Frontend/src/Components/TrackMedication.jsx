import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/TrackMedication.css";
import { IoMdClose } from "react-icons/io";

const TrackMedication = ({ searchQuery }) => {
  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState(null);
  const [medications, setMedications] = useState([]);
  const [show, setShow] = useState(false);
  const [zoom, setZoom] = useState(null);

  const fetchMedications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/gettrackcards");
      setMedications(response.data);
    } catch (error) {
      console.error("Error fetching Medications:", error);
    }
  };
  useEffect(() => {
    fetchMedications();
  }, []);

  const handleAddMedication = async () => {
    if (!medication || !dosage || !time) {
      alert("Please fill all fields before saving.");
      return;
    }

    const formData = new FormData();
    formData.append("medication", medication);
    formData.append("dosage", dosage);
    formData.append("time", time);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/addtrackcard",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        fetchMedications();
        setMedication("");
        setDosage("");
        setTime("");
        setImage(null);
        setShow(false);
        alert("Medication added successfully!");
      }
    } catch (error) {
      console.error("Error adding medication:", error);
      alert("Failed to add medication.");
    }
  };
  const filteredList = medications.filter((item) =>
    item.medication.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="trackmed-container">
      <h2>Track Your Medication</h2>
      <button onClick={() => setShow(true)} className="add-btn">
        Add Medication
      </button>

      <div className="medication-grid">
        {filteredList.length === 0 ? (
          <p>No medications logged yet.</p>
        ) : (
          filteredList.map((item, index) => (
            <div key={index} className="medication-card">
              <h3>{item.medication}</h3>
              <p>
                <strong>Dosage:</strong> {item.dosage}
              </p>
              <p>
                <strong>Time:</strong> {item.time}
              </p>
              <p>
                <small>
                  Logged on: {new Date(item.loggedAt).toLocaleString()}
                </small>
              </p>
              {item.imageUrl && (
                <img
                  src={`http://localhost:5000${item.imageUrl}`}
                  alt="Prescription"
                  onClick={() => setZoom(item.imageUrl)}
                  className="prescription-image"
                />
              )}
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
            <h2>Log Your Medication</h2>
            <input
              type="text"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              placeholder="Medication Name"
              required
            />
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="Dosage"
              required
            />
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="When to take"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button className="log-btn" onClick={handleAddMedication}>
              Save Medication
            </button>
          </div>
        </div>
      )}

      {zoom && (
        <div className="zoom-popup" onClick={() => setZoom(null)}>
          <img
            src={`http://localhost:5000${zoom}`}
            alt="Zoomed Prescription"
            className="zoomed-image"
          />
        </div>
      )}
    </div>
  );
};

export default TrackMedication;
