import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import passport from 'passport'
import cookie from 'cookie-session';
import clientRouter from './routers/client.router.js';
import adminRouter from './routers/admin.router.js'

const api = express();
api.use(express.json());
api.use(cookie({
    name: 'GYM',
    secret: process.env.COOKIE_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,   
    }
}));
api.use(passport.initialize());
api.use(passport.session());
api.use('/client', clientRouter);
api.use('/admin', adminRouter);

export default api;