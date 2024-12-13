const express = require("express");
const mongoose = require("mongoose");
const {connectMongoDB}=require("./connections")
const app = express();
const port = 8000;

// Connection
connectMongoDB(mongodb://127.0.0.1:27017/test1")


// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // For parsing JSON request bodies

// Routes

// 1. Get all users
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

// 2. Get all users as JSON
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  console.log(req.headers); // Log request headers
  res.setHeader("X-myName", "Batman"); // Set a custom response header
  return res.json(allDbUsers);
});

// 3. Get a user by ID
app.get("/api/users/:id", async (req, res) => {
  const id = req.params.id;

  // Validate if ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

// 4. Create a new user
app.post("/api/users", async (req, res) => {
  const body = req.body;

  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender ||
    !body.jobTitle
  ) {
    return res.status(400).json({
      msg: "All fields are required.",
    });
  }

  const result = await User.create({
    customId: body.customId || null, // Optional custom ID
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle,
  });

  res.status(201).json({
    msg: "User created successfully",
    user: result,
  });
});

// 5. Update a user by ID
app.patch("/api/users/:id", async (req, res) => {
  const id = req.params.id;

  // Validate if ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { firstName: "Kim", lastName: "Putin" }, // Replace with actual fields to update
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json({ status: "Success", user: updatedUser });
});

// 6. Delete a user by ID
app.delete("/api/users/:id", async (req, res) => {
  const id = req.params.id;

  // Validate if ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json({ status: "Success", user: deletedUser });
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
