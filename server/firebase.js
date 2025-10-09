// server/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Replace with your actual file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://insy7314poepart2-default-rtdb.firebaseio.com/' 
});

const db = admin.database();
module.exports = db;