import React, { useState } from "react";
import "./css/MedicalHistory.css";
import { IoMdClose } from "react-icons/io";

const MedicalHistory = () => {
  const [records, setRecords] = useState([]);
  const [text, setText] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [zoom, setZoom] = useState(null);

  const handleAddRecord = () => {
    if (!text && !image) {
      alert("Please enter text or upload an image.");
      return;
    }

    const newRecord = {
      text,
      reason,
      date,
      image: image ? URL.createObjectURL(image) : null,
    };
    setRecords([...records, newRecord]);

    setText("");
    setReason("");
    setDate("");
    setImage(null);
    setShow(false);
    document.getElementById("historyImage").value = "";
  };

  return (
    <div className="history-container">
      <h2>Medical History</h2>
      <button className="add-btn" onClick={() => setShow(true)}>
        Add New
      </button>
      {show && (
        <div className="form-popup">
          <div className="form-container">
            <button className="close-btn" onClick={() => setShow(false)}>
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
            <button className="log-btn" onClick={handleAddRecord}>
              Save Record
            </button>
          </div>
        </div>
      )}
      <div className="records-list">
        {records.length === 0 && <h3>No Past Records</h3>}
        {records.map((record, index) => (
          <div className="record-card" key={index}>
            <p>
              <strong>Date:</strong> {record.date}
            </p>
            <p>
              <strong>Details:</strong> {record.text}
            </p>
            <p>
              <strong>Reason:</strong> {record.reason}
            </p>
            {record.image && (
              <img
                src={record.image}
                alt="Medical Record"
                onClick={() => setZoom(record.image)}
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
  );
};

export default MedicalHistory;
