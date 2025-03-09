import React, { useState } from "react";
import "./css/TrackMedication.css";
import { IoMdClose } from "react-icons/io";
import Navbar from "./Navbar";

const TrackMedication = () => {
  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState(null);
  const [medications, setMedications] = useState([]);
  const [show, setShow] = useState(false);
  const [zoom, setZoom] = useState(null);

  const handleAddMedication = () => {
    if (!medication || !dosage || !time) {
      alert("Please fill all fields before saving.");
      return;
    }

    const newMedication = {
      medication,
      dosage,
      time,
      loggedAt: new Date().toLocaleString(),
      image: image ? URL.createObjectURL(image) : null,
    };

    setMedications([...medications, newMedication]);
    setShow(false);
    setMedication("");
    setDosage("");
    setTime("");
    setImage(null);
    document.getElementById("prescriptionImage").value = "";
  };

  return (
    <div>
      <Navbar />

      <div className="trackmed-container">
        <h2>Track Your Medication</h2>
        <button onClick={() => setShow(true)} className="add-btn">
          Add Medication
        </button>

        <div className="medication-grid">
          {medications.length === 0 ? (
            <p>No medications logged yet.</p>
          ) : (
            medications.map((item, index) => (
              <div key={index} className="medication-card">
                <h3>{item.medication}</h3>
                <p>
                  <strong>Dosage:</strong> {item.dosage}
                </p>
                <p>
                  <strong>Time:</strong> {item.time}
                </p>
                <p>
                  <small>Logged on: {item.loggedAt}</small>
                </p>
                {item.image && (
                  <img
                    src={item.image}
                    alt="Prescription"
                    onClick={() => setZoom(item.image)}
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
                placeholder="Dosage (e.g., 2 tablets)"
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
                id="prescriptionImage"
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
              src={zoom}
              alt="Zoomed Prescription"
              className="zoomed-image"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackMedication;
