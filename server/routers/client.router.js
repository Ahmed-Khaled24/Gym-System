import {Router} from 'express'
import * as clientController from '../controllers/client.controller.js'

const clientRouter = Router();

clientRouter.get('/all', clientController.getAllClients);
clientRouter.get('/:id', clientController.getClientLogs);
clientRouter.post('/add', clientController.addNewClient);
clientRouter.post('/renew', clientController.updateRenewalDate);
clientRouter.post('/freeze', clientController.freezeClient);
clientRouter.post('/unfreeze', clientController.unfreezeClient);

export default clientRouter;