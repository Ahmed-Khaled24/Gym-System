import mongoose from "mongoose";

const Client = mongoose.model('Client');

async function db_addNewClient(client){
    await Client.create(client);
} 

async function db_updateRenewDate(Id, newRenewDate){
    return await Client.updateOne({_id: Id}, {renewDate: newRenewDate});
}

async function db_getAllClients(){
    return await Client.find();
}

async function db_getFreezedClients(){
    return await Client.find({freezed: true});
}

async function db_getClientById(id){
    return await Client.find({_id: id});
}

export{ 
    db_addNewClient,
    db_getAllClients, 
    db_getFreezedClients, 
    db_getClientById
}