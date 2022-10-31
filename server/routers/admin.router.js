import {Router} from 'express'
import * as adminController from '../controllers/admin.controller.js'
import passport from 'passport'
import checkLoggedIn from '../middlewares/checkLoggedIn.js';
import checkSuper from '../middlewares/checkSuper.js'

const adminRouter = Router();

adminRouter.get('/all', checkLoggedIn, checkSuper, adminController.getAllAdmins);
adminRouter.post('/add', checkLoggedIn, checkSuper, adminController.addNewAdmin);
adminRouter.post('/activate', checkLoggedIn, checkSuper, adminController.activateAdmin);
adminRouter.post('/deactivate', checkLoggedIn, checkSuper, adminController.deactivateAdmin);
adminRouter.post('/promote', checkLoggedIn, checkSuper, adminController.promoteAdmin);
adminRouter.post('/degrade', checkLoggedIn, checkSuper, adminController.degradeAdmin);
adminRouter.post('/login', passport.authenticate('local', {successRedirect: '/admin/login/success', failureRedirect: '/admin/login/failure'}));
adminRouter.get('/login/success', (req, res) => { return res.status(200).json({status: 'authenticated'}) });
adminRouter.get('/login/failure', (req, res) => { return res.status(401).json({status: 'unauthenticated'}) });
adminRouter.delete('/logout', adminController.logout)

export default adminRouter;