const express = require("express");
const mdb = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Signup = require("./model1/signupSchema");
const SymptomCard =require("./model1/symptomsSchema");
const HistoryCard=require("./model1/historySchema");
const AppointmentCard=require("./model1/appointmentsSchema");


const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const PORT = 5000;
dotenv.config();


mdb
  
  .connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MDB Connection successfull");
  })
  .catch((err) => {
    console.log("Check your connection string", err);
  });

  const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage });

app.get("/",(req, res) => {
  res.send("<h1>Welcome to backend</h1>");
});


//--------------------------signup--------------------------------

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newSignup = new Signup({
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      password: hashedPassword,
      email: email,
    });
    await newSignup.save();
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
    const existingUser = await Signup.findOne({ email:email});
    
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
    const { symptom, severity, duration, notes} = req.body;

    if (!symptom || !severity || !duration) {
      return res.status(400).json({ message: "Please fill the details" });
    }

      const newSymptomEntry = new SymptomCard({ symptom, severity, duration, notes });
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

// Route to fetch medical history
app.get("/gethistorycards", async (req, res) => {
  try {
    const records = await HistoryCard.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching records", error });
  }
});

// Route to add medical history
app.post("/addhistorycard", upload.single("image"), async (req, res) => {
  try {
    const { text, reason, date } = req.body;
    let imagePath = null;
    if (req.file) {
      imagePath = req.file.path;
    }

    const newRecord = new HistoryCard({ text, reason, date, image: imagePath });
    await newRecord.save();
    res.status(201).json({ message: "Record added successfully", newRecord });
  } catch (error) {
    res.status(500).json({ message: "Error adding record", error });
  }
});

// Route to upload medical history image
app.post("/uploadmedicalimage", async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ message: "No image provided" });

    const buffer = Buffer.from(image.split(",")[1], "base64");
    const filePath = path.join(__dirname, "uploads", `medical_${Date.now()}.png`);
    fs.writeFileSync(filePath, buffer);

    res.status(201).json({ message: "Image uploaded successfully", imageUrl: filePath });
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error });
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
