import * as clientModel from '../models/client/client.model.js'
import {db_getClientLogs, db_addNewLog} from '../models/log/log.model.js'

async function addNewClient(req, res){
    const subscriptionDuration = req.body.subscriptionDuration;
    const renewalDate = new Date();
    renewalDate.setDate(renewalDate.getDate() + (subscriptionDuration * 30));
    const daysLeft = subscriptionDuration * 30;

    const client = {
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name.toLowerCase().trim(), 
        phone: req.body.phone.trim(),
        registrationDate: new Date(), 
        renewalDate,
        daysLeft,
    }

    try {
        await clientModel.db_addNewClient(client);
        await db_addNewLog({
            amount: subscriptionDuration * process.env.MONTH_FEE,
            durationInMonths: subscriptionDuration,
            type: 'new subscription',
            admin: req.user.id,
            client: client._id,
        });
        return res.status(200).json({
            status: 'success',
            client,
        });
    } catch(err){
        return res.status(500).json({
            status: 'failure',
            message: err.message,
        })
    }
}

async function updateRenewalDate(req, res){
    const clientId = req.body.id;
    const renewalDuration = req.body.renewalDuration;
    if(renewalDuration < 0) {
        return res.status(400).json({
            status: 'failure',
            message: 'invalid data, renewalDuration duration must be a positive number',
        })
    }
    
    const client = await clientModel.db_getClientById(clientId);
    const newRenewalDate = new Date(client.renewalDate) > new Date() ? new Date(client.renewalDate) : new Date();
    newRenewalDate.setMonth(newRenewalDate.getMonth() + renewalDuration);
    const newDaysLeft = Math.floor( (newRenewalDate - Date.now()) / 8.64e+7 );
    
    try {
        await clientModel.db_updateRenewalDate(clientId, newRenewalDate, newDaysLeft); 
        await db_addNewLog({
            amount: renewalDuration * process.env.MONTH_FEE,
            durationInMonths: renewalDuration,
            type: 'renew subscription',
            client: client._id,
            admin: req.user.id,
        })
        return res.status(200).json({ status: 'success' });
    } catch(err){
        return res.status(500).json({
            status: 'failure',
            message: err.message,
        })
    }
}

async function getAllClients(req, res){
    try {
        const clients = await clientModel.db_getAllClients();
        return res.status(200).json({
            status: 'success',
            clients,
        });
    } catch(err){
        return res.status(500).json({
            status: 'failure',
            message: err.message,
        })
    }
}

async function freezeClient(req, res){
    const clientId = req.body.id;
    try {
        await clientModel.db_freezeClient(clientId);
        await db_addNewLog({
            type: 'freeze',
            client: clientId,
            admin: req.user.id,
        })
        return res.status(200).json({
            status: 'success',
        });
    } catch(err){
        return res.status(500).json({
            status: 'failure',
            message: err.message,
        })
    }
} 

async function unfreezeClient(req, res){
    const clientId = req.body.id;
    const client = await clientModel.db_getClientById(clientId);
    const newRenewalDate = new Date();
    newRenewalDate.setDate(newRenewalDate.getDate() + client.daysLeft);

    try {
        await clientModel.db_unfreezeClient(clientId, newRenewalDate);
        await db_addNewLog({
            type: 'unfreeze',
            client: clientId,
            admin: req.user.id,
        })
        return res.status(200).json({
            status: 'success',
        });
    } catch(err){
        return res.status(500).json({
            status: 'failure',
            message: err,
        })
    }
}

async function getClientLogs(req, res){
    const clientId = req.params.id;
    try {
        const logs = await db_getClientLogs(clientId);
        return res.status(200).json({
            status: 'success',
            logs,
        });
    } catch(err){
        return res.status(500).json({
            status: 'failure',
            message: err.message,
        })
    }
}

export {
    addNewClient,
    getAllClients, 
    updateRenewalDate,
    freezeClient,
    unfreezeClient,
    getClientLogs,
}