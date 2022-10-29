import * as clientModel from '../models/client/client.model.js'

async function addNewClient(req, res){
    const registrationDate = new Date();
    const subscriptionDuration = req.body.subscriptionDuration;
    const renewalDate = new Date(registrationDate);
    renewalDate.setMonth(renewalDate.getMonth() + subscriptionDuration);
    const daysLeft = Math.floor( (renewalDate - Date.now()) / 8.64e+7 );

    const client = {
        name: req.body.name.toLowerCase().trim(), 
        phone: req.body.phone.trim(),
        registrationDate, 
        renewalDate,
        daysLeft,
    }

    try {
        await clientModel.db_addNewClient(client);
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
        res.status(400).json({
            status: 'failure',
            message: 'invalid data, renewal duration must be a positive number',
        })
    }
    
    const client = await clientModel.db_getClientById(clientId);

    // If the old renewal date still in the future increase it, else add the new duration from now.
    const newRenewalDate = new Date(client.renewalDate) > new Date() ? new Date(client.renewalDate) : new Date();
    newRenewalDate.setMonth(newRenewalDate.getMonth() + renewalDuration);

    const newDaysLeft = Math.floor( (newRenewalDate - Date.now()) / 8.64e+7 );
    
    try {
        await clientModel.db_updateRenewalDate(clientId, newRenewalDate, newDaysLeft);
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

    // If the old renewal date still in the future increase it, else add the days left from now.
    const newRenewalDate = new Date(client.renewalDate) > new Date() ? new Date(client.renewalDate) : new Date();
    newRenewalDate.setDate(newRenewalDate.getDate() + client.daysLeft);

    try {
        await clientModel.db_unfreezeClient(clientId, newRenewalDate);
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

export {
    addNewClient,
    getAllClients, 
    updateRenewalDate,
    freezeClient,
    unfreezeClient,
}