import React, { useState,useEffect } from "react";
import "./css/MedicalHistory.css";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

const MedicalHistory = ({ searchQuery }) => {
  const [records, setRecords] = useState([]);
  const [text, setText] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [zoom, setZoom] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const fetchSymptoms = async () => {
    try {
      const response = await axios.get("https://health-journal.onrender.com/gethistorycards");
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching symptoms:", error);
    }
  };

  useEffect(() => {
      fetchSymptoms();
    }, []);
  
    

  const handleAddRecord = async (e) => {
    e.preventDefault();
    if (!text && !image) {
      alert("Please enter text or upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append('text', text);
    formData.append('reason', reason);
    formData.append('date', date);
    if (image) {
      formData.append('image', image);
    }
  
    try {
      await axios.post("https://health-journal.onrender.com/addhistorycard", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchSymptoms();
      setText("");
      setReason("");
      setDate("");
      setImage(null);
      setShow(false);
      setSubmitted(true);
      document.getElementById("historyImage").value = "";
  
      setTimeout(() => {
        setSubmitted(false);
      }, 1000);
    } catch (error) {
      console.error("Error adding history:", error);
    }
  };
    const filteredList = records.filter((item) =>
       item.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  return (
    <div>

      <div className="history-container">
        <h2>Medical History</h2>
        <button className="history-add-btn" onClick={() => setShow(true)}>
          Add New
        </button>
        {show && (
          <div className="history-form-popup">
            <div className="history-form-container">
              <button className="history-close-btn" onClick={() => setShow(false)}>
                <IoMdClose />
              </button>
              <h3>Add Medical Record</h3>
              <input
                type="text"
                placeholder="Enter medical history"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <input
                type="text"
                placeholder="Reason for this medical history"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <input
                type="date"
                placeholder="Date of this medical history"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="file"
                id="historyImage"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button className="history-log-btn" onClick={handleAddRecord}>
                Save Record
              </button>
            </div>
          </div>
        )}
        <div className="records-list">
          {filteredList.length === 0 && <p>No Past Records</p>}
          {filteredList.map((record, index) => (
            <div className="record-card" key={index}>
              <p>
                <strong>Details:</strong> {record.text}
              </p>
              <p>
                <strong>Date:</strong> {record.date}
              </p>
              
              <p>
                <strong>Reason:</strong> {record.reason}
              </p>
              {record.image && (
  <img
    src={`https://health-journal.onrender.com/${record.image}`}
    alt="Medical Record"
    onClick={() => setZoom(`https://health-journal.onrender.com/${record.image}`)}
    className="record-image"
  />
)}
            </div>
          ))}
        </div>
        {zoom && (
  <div className="zoom-popup" onClick={() => setZoom(null)}>
    <img
      src={zoom}
      alt="Zoomed Medical Record"
      className="zoomed-image"
    />
  </div>
)}

      </div>
    </div>
  );
};

export default MedicalHistory;
