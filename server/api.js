import express from 'express'
import passport from 'passport'
import clientRouter from './routers/client.router.js';
import adminRouter from './routers/admin.router.js'

const api = express();
api.use(express.json());
api.use(passport.initialize());
// api.use(passport.session());
api.use('/client', clientRouter);
api.use('/admin', adminRouter);

export {api};