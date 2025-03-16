import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { FaSearch,FaHeartbeat } from "react-icons/fa";
import "./css/Navbar.css";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userid");
    navigate("/");
  }; 
  return (
    <header>
      <nav className="navbar-container">
        <div className="logo">
          <FaHeartbeat className="heartbeat-icon" />
          <span className="medi">Medi</span>
          <span className="map">Map</span>
        </div>
        <div className="menu-container">
          <Link to="/home" className="menu">Home</Link>
          <Link to="/symptoms" className="menu">Symptoms</Link>
          <Link to="/history" className="menu">Medical History</Link>
          <Link to="/appointments" className="menu">Appointments</Link>
        </div>
        <div className="navbar-right">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search... " value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}/>
          </div>
          <button type="submit" className="navbar-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;




