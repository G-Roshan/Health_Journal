import react from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import Symptoms from "./Components/Symptoms"
import MedicalHistory from "./Components/MedicalHistory"
import Appointments from "./Components/Appointments"
import NewEntry from "./Components/NewEntry"
import TrackMedication from "./Components/TrackMedication"
import EmergencyContacts from "./Components/EmergencyContacts"

const App = () => {
   return (
      <main>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/symptoms" element={<Symptoms/>}/>
          <Route path="/history" element={<MedicalHistory/>}/>
          <Route path="/appointments" element={<Appointments/>}/>
          <Route path="/newentry" element={<NewEntry/>}/>
          <Route path="/medication" element={<TrackMedication/>}/>
          <Route path="/emergency" element={<EmergencyContacts/>}/>
        </Routes>
        </BrowserRouter>
      </main>
   )
}
export default App;
