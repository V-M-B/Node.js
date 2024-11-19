const { log } = require("console");
const fs = require("fs");
// built in fs module

// it is a sync.. call
// fs.writeFileSync('where to write' , 'What to write')
// fs.writeFileSync('./test.txt','Hey There')

// it is a Asyn.. Call
// fs.writeFile('./test.txt','hi asyn',(err)=>{})

// Read File
// Sync
const result=fs.readFileSync("./Contacts.txt", "utf-8");
console.log(result);

// Asyn expects you to give the call-Back Function
// it will not return anything
fs.readFile('./Contacts.txt','utf-8',(err,result)=>{
    if (err) {
        console.log("Error",err);
    }
    else{
        console.log(result);
        
    }
})


// Append file
// Sync
const r=fs.appendFileSync('./test.txt','hey there\n')


// copy 
fs.cpSync('./test.txt',"./copy.txt")

// delete
fs.unlinkSync('./copy.txt')


fs.mkdirSync("mkdir-new")