import { PrismaClient } from "@prisma/client";

const prisma  = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query","info","warn","error"] : ["warn","error"],
});

const connectDB = async () => {

    try{
        await prisma.$connect();
        console.log("Database connected successfully");
    }
    catch(err){
        console.error("Database connection failed", err);
        process.exit(1);
    }
}


const disconnectDB = async () => {
    await prisma.$disconnect();
    console.log("Database disconnected successfully");
}

export { prisma, connectDB, disconnectDB };