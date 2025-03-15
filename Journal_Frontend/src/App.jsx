import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Symptoms from "./Components/Symptoms";
import MedicalHistory from "./Components/MedicalHistory";
import Appointments from "./Components/Appointments";
import NewEntry from "./Components/NewEntry";
import TrackMedication from "./Components/TrackMedication";
import EmergencyContacts from "./Components/EmergencyContacts";
import Bmi from "./Components/Bmi";

const Layout = ({ children, searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/signup"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && (
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}

      {React.Children.map(children, (child) =>
        React.cloneElement(child, { searchQuery })
      )}
    </>
  );
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState(""); 

  return (
    <BrowserRouter>
      <Layout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/symptoms" element={<Symptoms searchQuery={searchQuery} />} />
          <Route path="/history" element={<MedicalHistory searchQuery={searchQuery}/>} />
          <Route path="/appointments" element={<Appointments searchQuery={searchQuery} />} />
          <Route path="/newentry" element={<NewEntry searchQuery={searchQuery}/>} />
          <Route path="/medication" element={<TrackMedication searchQuery={searchQuery}/>} />
          <Route path="/emergency" element={<EmergencyContacts searchQuery={searchQuery}/>} />
          <Route path="/bmi" element={<Bmi searchQuery={searchQuery}/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;



