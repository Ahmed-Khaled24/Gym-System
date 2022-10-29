import mongoose from "mongoose";

mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected and ready...');
})
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB is disconnected...');
})
mongoose.connection.on('reconnected', () => {
    console.log('MongoDB is reconnected...');
})

async function connectMongo(){
    await mongoose.connect(process.env.MONGO_URL);
}

export {connectMongo};