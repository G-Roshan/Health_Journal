const express = require("express");
const mdb = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require('cors');
const Signup = require("./models/signupSchema");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
dotenv.config();


mdb
  
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MDB Connection successfull");
  })
  .catch((err) => {
    console.log("Check your connection string", err);
  });


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



app.listen(PORT, () => {
  console.log("Server started successfully");
});
