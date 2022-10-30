import mongoose from 'mongoose'

const Admin = mongoose.model('Admin');

async function db_getAllAdmins(){
    return await Admin.find({});
}

async function db_addNewAdmin(admin){
    return await Admin.create(admin);
}

async function db_activateAdmin(id){
    return await Admin.updateOne({_id: id}, {active: true});
}

async function db_deactivateAdmin(id){
    return await Admin.updateOne({_id: id}, {active: false});
}

async function db_getAdminById(id){
    return await Admin.findOne({_id: id});
}

async function db_promoteAdmin(id){
    return await Admin.updateOne({_id: id}, {super: true});
}

async function db_degradeAdmin(id){
    return await Admin.updateOne({_id: id}, {super: false});
}

export {
    db_addNewAdmin,
    db_deactivateAdmin,
    db_getAllAdmins,
    db_getAdminById,
    db_activateAdmin,
    db_promoteAdmin,
    db_degradeAdmin
}