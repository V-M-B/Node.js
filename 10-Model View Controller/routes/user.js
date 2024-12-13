const express=require("express")

const router= express.Router();

const mongoose=require("./routes/user")

// Routes

// 1. Get all users
router.get("/users", async (req, res) => {
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
  router.get("/api/users", async (req, res) => {
    const allDbUsers = await User.find({});
    console.log(req.headers); // Log request headers
    res.setHeader("X-myName", "Batman"); // Set a custom response header
    return res.json(allDbUsers);
  });
  
  // 3. Get a user by ID
  router.get("/api/:id", async (req, res) => {
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
  router.post("/", async (req, res) => {
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
  router.patch("/:id", async (req, res) => {
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
  router.delete("/:id", async (req, res) => {
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
  
  app.use("/user",userRouter)

  app.listen(port, () => console.log(`Server running on port ${port}`));