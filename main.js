const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path=require('path');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Connect to MongoDB
// mongodb://localhost:27017/worker_handymann_solution
const URI = 'mongodb+srv://Handyman:workerHandyman@cluster0.btq9peu.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(URI);
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error: ' + err);
});

// Define a simple user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Create a Mongoose model
const User = mongoose.model('User', userSchema);

// Middleware for parsing JSON
app.use(bodyParser.json());




// Endpoint for user registration
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint for user login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (user) {
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
