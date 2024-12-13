const mongoose=require("./routes/user")


// Connection
async function connectMongoDB(url) {
    return mongoose.connect(url)
}

module.exports={
    connectMongoDB,

}