const express = require("express");
const mdb = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const Signup = require("./model1/signupSchema");
const SymptomCard = require("./model1/symptomsSchema");
const AppointmentCard = require("./model1/appointmentsSchema");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  "/historyuploads",
  express.static(path.join(__dirname, "historyuploads"))
);
app.use(
  "/track-uploads",
  express.static(path.join(__dirname, "track-uploads"))
);

const PORT = 5000;
dotenv.config();

mdb
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MDB Connection successfull");
  })
  .catch((err) => {
    console.log("Check your connection string", err);
  });

app.get("/", (req, res) => {
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

//----------------------------------Login------------------------------------------------------

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Signup.findOne({ email });

    if (existingUser) {
      const isValidPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (isValidPassword) {
        res.status(201).json({
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
    const { symptom, severity, duration, notes } = req.body;

    if (!symptom || !severity || !duration) {
      return res.status(400).json({ message: "Please fill the details" });
    }

    const newSymptomEntry = new SymptomCard({
      symptom,
      severity,
      duration,
      notes,
    });
    await newSymptomEntry.save();
    res
      .status(201)
      .json({ message: "Symptom added successfully", entry: newSymptomEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/getsymptomscards", async (req, res) => {
  try {
    const symptoms = await SymptomCard.find();
    if (symptoms.length === 0) {
      return res
        .status(404)
        .json({ message: "No symptoms found for this user" });
    }

    res.status(200).json(symptoms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//-----------------------------Medical History----------------------------------------

const historySchema = new mdb.Schema({
  text: String,
  reason: String,
  date: String,
  image: String, // Image path
});

const HistoryCard = mdb.model("HistoryCard", historySchema);

const fs = require("fs");
const uploadDir = path.join(__dirname, "historyuploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Storage Setup for Image Upload

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

// API to Add Medical History with Image

app.get("/gethistorycards", async (req, res) => {
  try {
    const records = await HistoryCard.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Error fetching medical records." });
  }
});

// API to Add Medical History with Image

app.post("/addhistorycard", upload.single("image"), async (req, res) => {
  try {
    const { text, reason, date } = req.body;
    const imagePath = req.file ? `/historyuploads/${req.file.filename}` : "";

    const newRecord = new HistoryCard({
      text,
      reason,
      date,
      image: imagePath,
    });

    await newRecord.save();
    res.status(201).json({ message: "Record added successfully", newRecord });
  } catch (error) {
    res.status(500).json({ error: "Error adding medical record." });
  }
});

//---------------------------------------------Appointments---------------------------------------------------

app.post("/addappointmentcard", async (req, res) => {
  try {
    const { hospital, date, reason } = req.body;

    if (!hospital || !date) {
      return res.status(400).json({ message: "Please fill the details" });
    }

    const newAppointmentEntry = new AppointmentCard({ hospital, date, reason });
    await newAppointmentEntry.save();
    res
      .status(201)
      .json({
        message: "Appointments added successfully",
        entry: newAppointmentEntry,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/getappointmentscards", async (req, res) => {
  try {
    const appointments = await AppointmentCard.find();
    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this user" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//---------------------------------------------------New Entry-----------------------------------------------------------

const newentrySchema = new mdb.Schema({
  title: String,
  description: String,
  loggedAt: String,
});

const NewentryCard = mdb.model("NewentryCard", newentrySchema);

app.post("/addnewentrycard", async (req, res) => {
  try {
    const { title, description, loggedAt } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Please fill the details" });
    }

    const newentryEntry = new NewentryCard({ title, description, loggedAt });
    await newentryEntry.save();
    res
      .status(201)
      .json({ message: "NewEntries added successfully", entry: newentryEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/getnewentrycards", async (req, res) => {
  try {
    const newentry = await NewentryCard.find();
    if (newentry.length === 0) {
      return res
        .status(404)
        .json({ message: "No Newentries found for this user" });
    }

    res.status(200).json(newentry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//------------------------------------------------Track Medication-------------------------------------------------------------

const medicationSchema = new mdb.Schema({
  medication: String,
  dosage: String,
  time: String,
  imageUrl: String,
  loggedAt: { type: Date, default: Date.now },
});

const MedicationCard = mdb.model("MedicationCard", medicationSchema);

const uploadDir1 = path.join(__dirname, "track-uploads");
if (!fs.existsSync(uploadDir1)) {
  fs.mkdirSync(uploadDir1);
}

// Configure Multer for image uploads

const trackstorage = multer.diskStorage({
  destination: uploadDir1,
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const trackupload = multer({ storage: trackstorage });

// Route to get all medications

app.get("/gettrackcards", async (req, res) => {
  try {
    const medications = await MedicationCard.find();
    res.json(medications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching medications" });
  }
});

// Route to add a medication entry

app.post("/addtrackcard", trackupload.single("image"), async (req, res) => {
  try {
    const { medication, dosage, time } = req.body;
    const imageUrl = req.file ? `/track-uploads/${req.file.filename}` : "";

    const newMedication = new MedicationCard({
      medication,
      dosage,
      time,
      imageUrl,
    });
    await newMedication.save();

    res
      .status(201)
      .json({ message: "Medication added successfully", newMedication });
  } catch (error) {
    res.status(500).json({ error: "Error adding medication" });
  }
});

//------------------------------------------------------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
