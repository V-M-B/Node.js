const http=require("http")
const fs=require("fs")
const url=require("url")
const express=require("express");

const app=express();

app.get('/',(req,res)=>{
    return res.send("Hello From Home")
})

app.get('/about',(req,res)=>{
    return res.send("Hello From about" )
})

app.get('/news',(req,res)=>{
    return res.send("Hello From news")
})

const myserver=http.createServer(app);

myserver.listen(8000,()=>console.log("server Started"));
