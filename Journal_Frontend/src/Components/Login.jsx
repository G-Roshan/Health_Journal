import React from "react";
import "./css/Login.css";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaHeartbeat } from "react-icons/fa";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPass]=useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    try{
      setLoading(true);
      const req = await axios.post("https://health-journal.onrender.com/login", {
        email,
        password,
      });
      
      const { message, isLoggedin} = req.data;
      if (isLoggedin) {
        
        alert(message);
        navigate("/home");
      } else {
        alert("Invalid credentials. Please check your email and password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false); 
    }
  };
  

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
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
              value={email} onChange={e=>setEmail(e.target.value)}
              placeholder="Enter your Email"
              required
            />
          </div>

          <div className="login-wrapper">
            <RiLockPasswordLine className="input-icon" />
            <input
              type="password"
              id="Password"
              value={password} onChange={e=>setPass(e.target.value)}
              placeholder="Enter your Password"
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
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


