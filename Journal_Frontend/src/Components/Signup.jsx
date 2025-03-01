import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaHeartbeat } from "react-icons/fa";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import "./css/Signup.css"

const Signup = () => {
  return (
    <div className="signup-container">
      <form>
        <div className="signup-input">
          <div className="signup-content">
            <FaHeartbeat className="signup-icon" />
            <span className="signup-medi">Medi</span>
            <span className="signup-map">Map</span>
          </div>
           
          <div className="signup-wrapper">
            <MdOutlineDriveFileRenameOutline className="input1-icon" />
            <input
              type="text"
              id="firstname"
              placeholder="Enter your Firstname"
              required
            />
          </div>
          <div className="signup-wrapper">
            <MdOutlineDriveFileRenameOutline className="input1-icon" />
            <input
              type="text"
              id="lastname"
              placeholder="Enter your Lastname"
              required
            />
          </div>
          <div className="signup-wrapper">
            <MdOutlineEmail className="input1-icon" />
            <input
              type="email"
              id="Email"
              placeholder="Enter your Email"
              required
            />
          </div>

          <div className="signup-wrapper">
            <RiLockPasswordLine className="input1-icon" />
            <input
              type="password"
              id="Password"
              placeholder="Enter your Password"
              required
            />
          </div>
          <div className="signup-wrapper">
            <RiLockPasswordLine className="input1-icon" />
            <input
              type="password"
              id="CnfPassword"
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="signup-wrapper">
            <RiLockPasswordLine className="input1-icon" />
            <input
              type="number"
              id="phoneNumber"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <button type="submit" className="signup-btn">
            Login
          </button>
        </div>
      </form>
      <div className="signup-login">
        <p>Already have an account?</p>
        <Link to="/" className="signup-loginbtn">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;