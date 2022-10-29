import mongoose from "mongoose";

const User = mongoose.model('users');

async function db_addNewUser(user){
    await User.create(user);
} 

async function db_updateRenewDate(userId, newRenewDate){
    await User.updateOne({_id: userId}, {renewDate: newRenewDate});
}

async function db_getAllUsers(){
    await User.find({ADMIN: false})
}