import {Router} from 'express'
import * as adminController from '../controllers/admin.controller.js'

const adminRouter = Router();

// security middlewares to be added
adminRouter.get('/all', adminController.getAllAdmins);
adminRouter.post('/add', adminController.addNewAdmin);
adminRouter.post('/activate', adminController.activateAdmin);
adminRouter.post('/deactivate', adminController.deactivateAdmin);
adminRouter.post('/promote', adminController.promoteAdmin);
adminRouter.post('/degrade', adminController.degradeAdmin);

export default adminRouter;