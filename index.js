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
const users = [{ username: "Leif Bech", _id: "1" }];

app.post("/api/users", (req, res) => {
  const username = req.body.username;

  const newUser = { username, _id: String(users.length + 1) };

  users.push(newUser);
  return res.json(newUser);
});
app.get("/api/users", (req, res) => {
  return res.json(users);
});
/*app.post('/api/users/:_id/exercises', (req,res)=>{
const _id = params.id
users.find((x)=> x==_id)
})
*/
console.log("hey");
console.log("yo");

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
