const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const username = encodeURIComponent("<username>");
const password = encodeURIComponent("<password>");
const database = "EcoScan";

const uri = `mongodb+srv://${username}:${password}@cluster0.4op3n.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`;

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

mongoose.connect(uri)
  .then(() => console.log('✅ Connected to MongoDB successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const db = mongoose.connection;

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  lastname: { type: String, required: true},
  name: { type: String, required: true},
  email: { type: String, required: true},
  telephone: { type: String, required: true},
  password: { type: String, required: true}
});
const User = mongoose.model('User', userSchema);

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Get all items
// app.get("/getAllUsers", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Create a new item
app.post("/createUser", async (req, res) => {
  const { name, lastname, email, password, telephone } = req.body;
  if (!name || !lastname || !email || !password || !telephone) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
    const encrypt = await encryptPassword(password);
    const user = new User({
      lastname,
      name,
      email,
      telephone,
      password : encrypt,
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Connect to database
app.get("/connection", async (req, res) => {
  const { email, password } = req.query;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid email or password' });
    }
    else{
      res.status(200).json({ success: true, message: 'Login successful'});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});