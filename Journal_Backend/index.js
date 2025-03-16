const express = require("express");
const mdb = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require("cors");
const multer=require("multer");

const Signup = require("./model1/signupSchema");
const SymptomCard =require("./model1/symptomsSchema");
const HistoryCard=require("./model1/historySchema");
const AppointmentCard=require("./model1/appointmentsSchema");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
dotenv.config();


mdb
  
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MDB Connection successfull");
  })
  .catch((err) => {
    console.log("Check your connection string", err);
  });

  const storage = multer.memoryStorage();
  const upload = multer({ storage });

app.get("/",(req, res) => {
  res.send("<h1>Welcome to backend</h1>");
});


//--------------------------signup--------------------------------

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required", isSignUp: false });
    }
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", isSignUp: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
 
    const newUser = new Signup({
      name: name,
      phoneNumber: phoneNumber,
      password: hashedPassword,
      email: email,
    });
    await newUser.save();
    console.log("Signup successful");
    res.status(201).json({ message: "Signup Successful", isSignUp: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Signup Unsuccessful", isSignUp: false });
  }
});




// app.get("/getsignupdet",  async (req, res) => {
//   const signup = await Signup.find();
//   console.log(signup);
//   res.send("Signup details fetched");
// });

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Signup.findOne({ email});
    
    if (existingUser) {

      const isValidPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (isValidPassword) {
        res
          .status(201)
          .json({
            message: "Login successful",
            isLoggedin: true,
            userid: existingUser._id
          });
      } else {
        res
          .status(201)
          .json({ message: "Incorrect password", isLoggedin: false });
      }
    } else {
      res
        .status(201)
        .json({ message: "User not found Signup first", isLoggedin: false });
    }
  } catch (error) {
    console.log("Error");
    res.status(400).json({ message: "Login Error", isLoggedin: false });
  }
});


// ---------------------symptom schema----------------------------------------

app.post("/addsymptomcard", async (req, res) => {
  
  try {
    const {symptom, severity, duration, notes} = req.body;

    if (!symptom || !severity || !duration) {
      return res.status(400).json({ message: "Please fill the details" });
    }

      const newSymptomEntry = new SymptomCard({symptom, severity, duration, notes });
      await newSymptomEntry.save();
      res.status(201).json({ message: "Symptom added successfully", entry: newSymptomEntry });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
});

app.get("/getsymptomscards", async (req, res) => {
  try {
    const symptoms = await SymptomCard.find();
    if (symptoms.length === 0) {
      return res.status(404).json({ message: "No symptoms found for this user" });
    }

    res.status(200).json(symptoms);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
}
});

//-----------------------------Medical History----------------------------------------

app.post("/addhistorycard", async (req, res) => {
  
  try {
    const {text, reason, date,image} = req.body;

    if (!text || !reason || !date||!image) {
      return res.status(400).json({ message: "Please fill all the details" });
    }
      
      const newHistoryEntry = new HistoryCard({text, reason, date, image});
      await newHistoryEntry.save();
      res.status(201).json({ message: "Medical history added successfully", entry: newHistoryEntry });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
});

app.get("/gethistorycards", async (req, res) => {
  try {
    const history = await HistoryCard.find();
    if (history.length === 0) {
      return res.status(404).json({ message: "No history found for this user" });
    }

    res.status(200).json(history);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
}
});

//---------------------------------------------Appointments---------------------------------------------------

app.post("/addappointmentcard", async (req, res) => {
  
  try {
    const {hospital,date,reason} = req.body;

    if (!hospital||!date) {
      return res.status(400).json({ message: "Please fill the details" });
    }

      const newAppointmentEntry = new AppointmentCard({hospital,date,reason });
      await newAppointmentEntry.save();
      res.status(201).json({ message: "Appointments added successfully", entry: newAppointmentEntry });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
});

app.get("/getappointmentscards", async (req, res) => {
  try {
    const appointments = await AppointmentCard.find();
    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this user" });
    }

    res.status(200).json(appointments);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
}
});

//--------------------------------------------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
