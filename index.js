const express = require("express");
const app = express();
const http = require("http");
const path = require("path");

//50 is the ms until the game updates state. io is the socket server

//init starts the gameloop and handles enemy states/attack states

app.get("/:file", (req, res) => {
  res.sendFile(path.join(__dirname, req.params.file));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/:path/:file", (req, res) => {
  res.sendFile(path.join(__dirname + "/" + req.params.path, req.params.file));
});

//User info is held inside of the socket object associated with that connection.
//As such: all the user logic is handled here in the index.js

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on *:80");
});
