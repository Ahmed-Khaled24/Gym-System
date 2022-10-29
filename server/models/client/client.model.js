import mongoose from "mongoose";

const Client = mongoose.model('Client');

async function db_addNewClient(client){
    await Client.create(client);
} 

async function db_updateRenewalDate(Id, newRenewalDate, newDaysLeft){
    return await Client.updateOne({_id: Id}, {renewalDate: newRenewalDate, daysLeft: newDaysLeft});
}

async function db_getAllClients(){
    return await Client.find();
}

async function db_getFreezedClients(){
    return await Client.find({freezed: true});
}

async function db_getClientById(id){
    return await Client.findOne({_id: id});
}

async function db_freezeClient(id){
    return await Client.updateOne({_id: id}, {freezed: true});
}

async function db_unfreezeClient(id, newRenewalDate){
    return await Client.updateOne({_id: id}, {
        freezed: false, 
        renewalDate: newRenewalDate
    });
}

export{ 
    db_addNewClient,
    db_getAllClients, 
    db_getFreezedClients, 
    db_getClientById,
    db_updateRenewalDate,
    db_freezeClient,
    db_unfreezeClient
}