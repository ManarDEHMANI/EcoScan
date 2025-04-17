const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;
const nodemailer = require('nodemailer'); 

app.use(cors());
app.use(express.json());

const username = encodeURIComponent("<username>");
const password = encodeURIComponent("<password>");
const database = "EcoScan";

//const uri = `mongodb+srv://${username}:${password}@cluster0.4op3n.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`;
const uri = `mongodb+srv://admin:egSa89fZDEkI49Oy@cluster0.4op3n.mongodb.net/EcoScan?retryWrites=true&w=majority`

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
  password: { type: String, required: true},
  avatar: { type: String, default: '' }
});
const User = mongoose.model('User', userSchema);

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});


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

app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log("📨 Email request received:", req.body);

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'projetesiee1@gmail.com', 
        pass: 'projet2024',     
      }
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'projetesiee1@gmail.com', 
      subject: `Contact: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}

        Message:
        ${message}
      `
    });

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error('❌ Email failed:', err);
    res.status(500).json({ success: false, message: 'Failed to send email', error: err.message });
  }
});

app.put('/users/update/:_id', async (req, res) => {
  const { _id } = req.params;
  const { name, lastname, email, telephone, avatar } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { name, lastname, email, telephone, avatar },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated', user: updatedUser });
    console.log("🛠️ PUT /users/update/:id", _id, req.body);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("🛠️ PUT /users/update/:id", _id, req.body);

  }
});

app.put('/init-avatar-field', async (req, res) => {
  try {
    const result = await User.updateMany(
      { avatar: { $exists: false } },
      { $set: { avatar: '' } }
    );
    res.status(200).json({ message: 'Avatar field initialized', result });
  } catch (err) {
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
      res.status(200).json({ success: true, message: 'Login successful',
        user: {
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          avatar: user.avatar,
          telephone: user.telephone,
          _id: user._id 
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

app.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
