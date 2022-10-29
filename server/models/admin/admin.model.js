import mongoose from 'mongoose'

const Admin = mongoose.model('Admin');

async function db_addNewAdmin(admin){
    return await Admin.create(admin);
}

async function db_deactivateAdmin(id){
    return await Admin.updateOne({_id: id}, {active: false});
}

async function db_getAllAdmins(){
    return await Admin.find();
}

export {
    db_addNewAdmin,
    db_deactivateAdmin,
    db_getAllAdmins,
}