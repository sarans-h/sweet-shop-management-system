const mongoose = require('mongoose');
const url_mongo=process.env.MONGO||'mongodb://localhost:27017/sweetshop';
const connectDB=async()=>{
    await mongoose.connect(url_mongo);
    console.log("DB CONNECTED");
}
module.exports= connectDB;