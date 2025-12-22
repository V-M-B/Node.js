// const express = require('express');  method 1 
import express from 'express';  // method 2 (ES6)

const router=express.Router();

router.get('/',(req,res)=>{
    res.json("Get all movies");
});

export default router ;