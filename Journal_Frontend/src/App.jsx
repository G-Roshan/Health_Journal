import react from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Navbar from "./Components/Navbar"

const App = () => {
   return (
      <main>
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
        </BrowserRouter>
      </main>
   )
}
export default App;
