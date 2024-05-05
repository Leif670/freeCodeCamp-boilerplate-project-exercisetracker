const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
const users = [{ username: "Leif Bech", _id: "1", exercises: [] }];

app.post("/api/users", (req, res) => {
  const username = req.body.username;

  const newUser = { username, _id: String(users.length + 1) };

  users.push(newUser);
  return res.json(newUser);
});
app.get("/api/users", (req, res) => {
  return res.json(users);
});
const finduserbyId = (userId) => {
  return users.find((user) => user._id === userId);
};
app.post("/api/users/:_id/exercises", (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;
  const user = finduserbyId(_id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const newExercise = {
    description,
    duration: parseInt(duration),
    date: date ? new Date(date) : new Date()
  };
user.exercises.push(newExercise)
  return res.json(user)
});

console.log("hey");
console.log("yo");

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
