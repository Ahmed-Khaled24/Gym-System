import {Router} from 'express'
import * as clientController from '../controllers/client.controller.js'
import checkLoggedIn from '../middlewares/checkLoggedIn.js';
import checkActive from '../middlewares/checkActive.js'
const clientRouter = Router();

clientRouter.get('/all', checkLoggedIn, checkActive, clientController.getAllClients);
clientRouter.get('/:id', checkLoggedIn, checkActive, clientController.getClientLogs);
clientRouter.post('/add', checkLoggedIn, checkActive, clientController.addNewClient);
clientRouter.post('/renew', checkLoggedIn, checkActive, clientController.updateRenewalDate);
clientRouter.post('/freeze', checkLoggedIn, checkActive, clientController.freezeClient);
clientRouter.post('/unfreeze', checkLoggedIn, checkActive, clientController.unfreezeClient);

export default clientRouter;