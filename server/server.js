const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const db = require('./firebase');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Secure Payments API is running');
});

app.post('/signup', async (req, res) => {
  const { fullName, idNumber, username, password, accountNumber } = req.body;

  if (!fullName || !idNumber || !username || !password || !accountNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const userRef = db.ref(`users/${username}`);
    const snapshot = await userRef.once('value');
    if (snapshot.exists()) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userRef.set({
      fullName,
      idNumber,
      accountNumber,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Fetch user profile from Firebase
    const userRef = db.ref(`users/${username}`);
    const snapshot = await userRef.once('value');

    if (!snapshot.exists()) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = snapshot.val();

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Success
    res.status(200).json({
      message: 'Login successful',
      fullName: userData.fullName,
      accountNumber: userData.accountNumber
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(5000, () => {
  console.log('✅ Server running on port 5000');
});