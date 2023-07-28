// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/user");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/usersdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(error => console.error("Error connecting to MongoDB:", error));

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  console.log(email)


  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "Username already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.json({ message: "Registration successful! please proceed to login" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during registration." });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials." });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid credentials." });
      return;
    }

    res.json({ message: "Login successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during login." });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
