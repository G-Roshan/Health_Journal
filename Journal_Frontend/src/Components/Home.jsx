import React, { useState, useEffect } from "react";
import { Link,} from "react-router-dom";
import {
  FaPhoneAlt,
  FaPlusCircle,
  FaNotesMedical,
  FaBalanceScale,
} from "react-icons/fa";
import "./css/Home.css";
const healthTips = [
  "Stay hydrated! Drinking 8 glasses of water daily boosts metabolism. 💧",
  "Take a 10-minute walk after meals to aid digestion and lower blood sugar. 🚶‍♂️",
  "Get 7-9 hours of sleep for better focus, mood, and immunity. 😴",
  "Include protein in your breakfast to stay full longer and reduce cravings. 🍳",
  "Practice deep breathing for 5 minutes daily to reduce stress and anxiety. 🧘",
];

const Home = () => {
  const [dailyTip, setDailyTip] = useState("");

  useEffect(() => {
    const tip = healthTips[Math.floor(Math.random() * healthTips.length)];
    setDailyTip(tip);
  }, []);

  

  return (
    <div>
      <div className="home-container">
        <div className="home">
          <div className="home-text">
            <h1>
              Welcome to <span className="medimap-text">MediMap</span>
            </h1>
            <p>
              Your personal health tracker for symptoms, history, and
              appointments.
            </p>
          </div>
        </div>
        <div className="health-tip-container">
          <h2>Health Tip of the Day 🩺</h2>
          <p className="health-tip">{dailyTip}</p>
        </div>

        <div className="insights-container">
          <h2>Health Insights</h2>
          <div className="insights">
            <Link to="/newentry" className="insights-space">
              <FaPlusCircle className="insights-icon" />
              Add New Entry
            </Link>
            <Link to="/medication" className="insights-space">
              <FaNotesMedical className="insights-icon" />
              Track Medications
            </Link>
            <Link to="/emergency" className="insights-space">
              <FaPhoneAlt className="insights-icon" />
              Emergency Contacts
            </Link>
            <Link to="/bmi" className="insights-space">
              <FaBalanceScale className="insights-icon" />
              Check BMI
            </Link>
          </div>
        </div>

        <footer className="footer">
          <p>&copy; 2025 All Rights Reserved by MediMap Foundations</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
