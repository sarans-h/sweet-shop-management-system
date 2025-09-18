import mongoose from 'mongoose';
const url_mongo = process.env.url_mongo || 'mongodb://localhost:27017/sweetshop';
const connectDB = async () => {
    await mongoose.connect(url_mongo);
    console.log("DB CONNECTED");
};
export default connectDB;