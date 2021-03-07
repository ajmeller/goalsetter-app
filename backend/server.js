const express = require("express");
const daily = require("./routes/daily");
const auth = require("./routes/auth");
const cors = require("cors");
const app = express();
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
  apiKey: "AIzaSyAKH0cRNvzMHjnd27DVAtFRXBrJezKf714",
  authDomain: "goal-setter-42c4f.firebaseapp.com",
  projectId: "goal-setter-42c4f",
  storageBucket: "goal-setter-42c4f.appspot.com",
  messagingSenderId: "321861937184",
  appId: "1:321861937184:web:18544bc77ceb62e4a83445",
};
firebase.initializeApp(firebaseConfig);

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/publicser"));
app.use("/", daily);

app.listen(3000);
