const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const port = 8000;

// Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDb Error : ", err));

// Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

// Model
const User = mongoose.model("user", userSchema);
// "users" collection created - prurals are added by mongoDB

// Middleware - Plugin
app.use(express.urlencoded({ extended: false })); // This will work according to the content type in the header.

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
        ${allDbUsers
          .map((user) => {
            return `<li>${user.firstName} - ${user.email}</li>`;
          })
          .join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  // Sending the header in the request section
  console.log(req.headers);

  // Setting custom headers in response
  res.setHeader("X-myName", "Batman");
  return res.json(allDbUsers);
});

app.get("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const users = await User.findById(id);

  if (!users) {
    return res.status(404).json({
      error: "User not found",
    });
  }
  res.json(users);
});

app.post("/api/users/", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({
      msg: "All fields are required....",
    });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  res.status(201).json({
    msg: "Success",
  });
});

app.patch("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndUpdate(id, {
    firstName: "Kim",
    lastName: "Putin",
  });
  return res.json({ status: "Success" });
});

app.delete("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  return res.json({
    status: "Success",
  })
});

app.listen(port);