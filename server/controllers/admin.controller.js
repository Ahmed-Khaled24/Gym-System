import * as adminModel from '../models/admin/admin.model.js'
import {encryptPassword} from '../util/password.js'
import randomLoginId from '../util/loginId.js'

async function getAllAdmins(req, res){
    try {
        const admins = await adminModel.db_getAllAdmins();
        return res.status(200).json({
            status: 'success',
            admins,
        })
    } catch(err){
        return res.status(500).json({
            status: 'failure',
            message: err.message,
        })
    }
}

async function addNewAdmin(req, res){
    const admin = {
        name: req.body.name.toLowerCase().trim(),
        password: await encryptPassword(req.body.password),
        registeredDate: new Date(),
        loginId: randomLoginId(),
    }

    try {
        await adminModel.db_addNewAdmin(admin);
        return res.status(200).json({
            status: 'success',
            admin,
        })
    } catch(err){
        return res.status(500).json({
            status: 'failure',
            message: err.message,
        })
    }
}

async function activateAdmin(req, res){
    const adminId = req.body.id;
    try {
        await adminModel.db_activateAdmin(adminId);
        return res.status(200).json({
            status: 'success'
        })
    } catch(err){
        return res.status(500).json({
            status: 'failure',
            message: err.message,
        })
    }
}

async function deactivateAdmin(req, res){
    const adminId = req.body.id;
    try {
        await adminModel.db_deactivateAdmin(adminId);
        return res.status(200).json({
            status: 'success'
        })
    } catch(err){
        return res.status(500).json({
            status: 'failure',
            message: err.message,
        })
    }
}

async function promoteAdmin(req, res){
    const adminId = req.body.id;
    try {
        await adminModel.db_promoteAdmin(adminId);
        return res.status(200).json({
            status: 'success'
        })
    } catch(err){
        return res.status(500).json({
            status: 'failure',
            message: err.message,
        })
    }
}

async function degradeAdmin(req, res){
    const adminId = req.body.id;
    try {
        await adminModel.db_degradeAdmin(adminId);
        return res.status(200).json({
            status: 'success'
        })
    } catch(err){
        return res.status(500).json({
            status: 'failure',
            message: err.message,
        })
    }
}

function logout (req, res){
    req.logout( (err) => {
        if(err){
            return res.status(500).json({
                status: 'failure',
                message: err.message,
            });
        }
    });
    return res.status(200).json({ status: 'success'})
}

export {
    getAllAdmins,
    addNewAdmin, 
    activateAdmin,
    deactivateAdmin,
    promoteAdmin,
    degradeAdmin,
    logout
}