const express = require("express");

const users = require("./MOCK_DATA.json");

const app = express();

const PORT = 8000;

const fs = require('fs');
const { default: mongoose } = require("mongoose");
const { type } = require("os");
const { log } = require("console");

//plugIn middleware 
app.use(express.urlencoded({extended:false}))

// app.use((req,res,next)=>{
//     console.log("Hello from middleware 1");
//     req.myusername="newbie@dev"
//     next();
// })

// app.use((req,res,next)=>{
//     console.log("Hello from middleware 2",req.myusername);
//     return res.end("Hey")
   
// })


// Connect mongoose
mongoose.connect('mongodb://127.0.0.1:27017/test1')
.then(()=>console.log('MongoDB Connected'))
.catch((err)=>console.log("Mongo Error",err));



//Schema Define
const userSchema =new mongoose.Schema({
  first_name:{
    type:String,
    required:true,
  },

  last_name:{
    type:String,
    
  },

  email:{
    type:String,
    required:true,
    unique:true,
  },

  job_title:{
    type:String,
  },

  gender:{
    type:String,
  },
},{timestamps:true})

const User=mongoose.model('user',userSchema)





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

app.post('/api/users',async (req,res)=>{
    // create new user
    const body=req.body;

    // 404
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title ) {
      return res.status(400).json({msg:'all fields should br filled'})
    }
    const result= await User.create({
      first_name:body.first_name,
      last_name:body.last_name,
      email:body.email,
      gender:body.gender,
      job_title:body.job_title,

    })
    console.log("result",result);
    
    return res.status(201).json({msg:"success"})
  });

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
// add "x- " for custom Header