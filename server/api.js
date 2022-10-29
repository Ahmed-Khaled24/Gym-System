import express from 'express'
import passport from 'passport'
import clientRouter from './routers/client.router.js';

const api = express();
api.use(express.json());
api.use(express.urlencoded({extended: true}));
api.use(passport.initialize());
// api.use(passport.session());
api.use('/client', clientRouter);

export {api};