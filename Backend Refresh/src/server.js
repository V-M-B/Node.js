// const express = require('express');
import { config } from 'dotenv';
import express from 'express';
import movieRouter from  './routes/movieRoutes.js';
import { connectDB,disconnectDB  } from './config/db.js';

config(); // to read .env file

const app=express(); //instance of express

const PORT = 3000;


// API Route 
app.use("/movies",movieRouter);

const server =
app.listen(PORT,()=>{
    console.log(`Server running on port  ${PORT}` )
})



// disconnect 
// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
