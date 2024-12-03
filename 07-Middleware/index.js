const express = require("express");

const users = require("./MOCK_DATA.json");

const app = express();

const PORT = 8000;

const fs = require('fs')

//plugIn middleware 
app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=>{
    console.log("Hello from middleware 1");
    req.myusername="newbie@dev"
    next();
})

app.use((req,res,next)=>{
    console.log("Hello from middleware 2",req.myusername);
    return res.end("Hey")
   
})

// routes
app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join(" ")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id); //get

    // find
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })

  // .post((req, res) => {
  //   // EDIT the user with id
  //   return res.json({ status: "pending" });
  // })

  // .delete((req, res) => {
  //   // Delete the user with id
  //   return res.json({ status: "pending" });
  // });


// POST

app.post('/api/users',(req,res)=>{
    // create new user
    const body=req.body;

   users.push({...body,id:users.length+1})//id is give by ourself .. total length + 1
   fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{

     return res.json({status :"pending"})
    })
    
})


// PATCH

app.patch('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  // Update user
  const user = users.find((user) => user.id === id);
  if (!user) return res.status(404).json({ status: "error", message: "User not found" });

  Object.assign(user, body); // Update fields

  // Save changes
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
      if (err) return res.status(500).json({ status: "error", message: "Could not update user" });
      res.json({ status: "success", message: `User with id ${id} updated`, user });
  });
});


//  DELETE

app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);

  // Remove user
  const updatedUsers = users.filter((user) => user.id !== id);

  // Write updated data to file
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(updatedUsers), (err) => {
      if (err) {
          return res.status(500).json({ status: "error", message: "Could not delete user" });
      }
      return res.json({ status: "success", message: `User with id ${id} deleted` });
  });
});


app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));

//express does not know it is which type of data so we use : MIDDLEWARE  :