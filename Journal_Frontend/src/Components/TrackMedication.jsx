import React, { useState,useEffect } from "react";
import "./css/TrackMedication.css";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

const TrackMedication = ({searchQuery}) => {
  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState(null);
  const [medications, setMedications] = useState([]);
  const [show, setShow] = useState(false);
  const [zoom, setZoom] = useState(null);

  const handleAddMedication = async() => {
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
  const filteredList = medications.filter((item) =>
    item.medication.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // const fetchTrackmedication = async () => {
  //     try {
        
  //       const response = await axios.get(
  //         "http://localhost:5000/gettrackcards",
         

  //       );
  //       setMedications(response.data);
  //     } catch (error) {
  //       console.error("Error fetching Medications:", error);
  //     }
  //   };
  
  //   useEffect(() => {
  //     fetchTrackmedication();
  //   }, []);
  
  //   const handleAddMedication = async () => {
  //     const formData = new FormData();
  //     formData.append("medication", medication);
  //     formData.append("dosage", dosage);
  //     formData.append("time", time);
  //     formData.append("image", image); // File object
  
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:5000/addtrackcard",
  //         formData,
  //         { headers: { "Content-Type": "multipart/form-data" } }
  //       );
  
  //       if (response.status === 201) {
  //         const newRecord = response.data.newRecord;
  //         fetchMedication();
  
  //         setMedication("");
  //         setDosage("");
  //         setTime("");
  //         setImage(null);
  //         setShow(false);
  
  //         alert("Medication added successfully!");
  //       }
  //     } catch (error) {
  //       console.error("Error adding medication:", error);
  //       alert("Failed to add medication.");
  //     }
  //   };
  
  //   const fetchMedication = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/gettrackcards");
  //       setMedications(response.data);
  //     } catch (error) {
  //       console.error("Error fetching Medications:", error);
  //     }
  //   };
  
  //   const filteredList = medications.filter((item) =>
  //     item.medication.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  return (
    <div>

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
