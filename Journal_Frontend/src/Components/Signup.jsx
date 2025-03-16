import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaHeartbeat } from "react-icons/fa";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import "./css/Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [phoneNumber, setPN] = useState(0);

  const handleSignup = async (event) => {
    event.preventDefault();
      const req=await axios.post("https://health-journal.onrender.com/signup",{
        name:name,
        email:email,
        password:password,
        phoneNumber:phoneNumber
      })
      const message=req.data.message
      const isSignUp=req.data.isSignUp
      if(isSignUp){
          alert(message)
          navigate("/")
          
      }else{
          alert(message)
      }
  }
  return (
    <div className="signup-container">
      <form onSubmit={handleSignup}>
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
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Firstname"
              required
            />
          </div>
          <div className="signup-wrapper">
            <MdOutlineEmail className="input1-icon" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              required
            />
          </div>

          <div className="signup-wrapper">
            <RiLockPasswordLine className="input1-icon" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter your Password"
              required
            />
          </div>
          <div className="signup-wrapper">
            <MdOutlineLocalPhone className="input1-icon" />
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPN(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <button type="submit" className="signup-btn">
            SignUp
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
