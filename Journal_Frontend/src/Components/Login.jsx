import React from "react";
import "./css/Login.css";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaHeartbeat } from "react-icons/fa";

const Login = () => {
  return (
    <div className="login-container">
      <form>
        <div className="login-input">
          <div className="login-content">
            <FaHeartbeat className="login-icon" />
            <span className="login-medi">Medi</span>
            <span className="login-map">Map</span>
          </div>

          <div className="login-wrapper">
            <MdOutlineEmail className="input-icon" />
            <input
              type="email"
              id="Email"
              placeholder="Enter your Email"
              required
            />
          </div>

          <div className="login-wrapper">
            <RiLockPasswordLine className="input-icon" />
            <input
              type="password"
              id="Password"
              placeholder="Enter your Password"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </div>
      </form>
      <div className="login-signup">
        <p>Don't have an account?</p>
        <Link to="/signup" className="login-signupbtn">
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default Login;