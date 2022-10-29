import mongoose from "mongoose";

const Log = mongoose.model('Log');

async function db_getAllLogs(){
    return await Log.find();
}

async function db_getClientLogs(id){
    return await Log.find({client: id});
}

async function db_addNewLog(log){
    return await Log.create(log);
}

export {
    db_addNewLog, 
    db_getAllLogs, 
    db_getClientLogs,
}