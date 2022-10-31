import {Router} from 'express'
import * as adminController from '../controllers/admin.controller.js'
import passport from 'passport'

const adminRouter = Router();

adminRouter.get('/all', adminController.getAllAdmins);
adminRouter.post('/add', adminController.addNewAdmin);
adminRouter.post('/activate', adminController.activateAdmin);
adminRouter.post('/deactivate', adminController.deactivateAdmin);
adminRouter.post('/promote', adminController.promoteAdmin);
adminRouter.post('/degrade', adminController.degradeAdmin);
adminRouter.post('/login', passport.authenticate('local', {successRedirect: '/admin/login/success', failureRedirect: '/admin/login/failure'}));
adminRouter.get('/login/success', (req, res) => { 
    return res.status(200).json({status: 'authenticated'}) 
});
adminRouter.get('/login/failure', (req, res) => { 
    return res.status(401).json({status: 'unauthenticated'}) 
});

export default adminRouter;