import React, { useState,useEffect } from "react";
import "./css/Appointments.css";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

const Appointments = ({ searchQuery }) => {
  const [hospital, setHospital] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getappointmentscards");
      setList(response.data);
    } catch (error) {
      console.error("Error fetching symptoms:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      hospital,
      date,
      reason,
    };

    try {
      const response = await axios.post("http://localhost:5000/addappointmentcard", data);
      fetchAppointments(); 
      setShow(false);
    setHospital("");
    setDate("");
    setReason("");
    } catch (error) {
      console.error("Error adding symptom:", error);
    }  
  };
  const filteredList = list.filter((item) =>
    item.hospital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      
      <div className="appointments-container">
        <h2>Appointment Logs</h2>
        <button onClick={() => setShow(true)} className="appointments-add-btn">
          Add New Appointment
        </button>
        <div className="appointments-grid">
          {filteredList.length === 0 ? (
            <p>No appointments logged yet.</p>
          ) : (
            filteredList.map((item, index) => (
              <div key={index} className="appointment-card">
                <h3>{item.hospital}</h3>
                <p>
                  <strong>Date:</strong> {item.date}
                </p>
                <p>
                  <strong>Reason:</strong> {item.reason || "Not specified"}
                </p>
              </div>
            ))
          )}
        </div>
        {show && (
          <div className="appointments-form-popup">
            <div className="appointments-form-container">
              <button className="appointments-close-btn" onClick={() => setShow(false)}>
                <IoMdClose />
              </button>
              <h2>Log Your Appointment</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  placeholder="Hospital Name"
                  required
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Reason for Visit"
                ></textarea>
                <button type="submit" className="appointments-log-btn">
                  Log Appointment
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments; 

