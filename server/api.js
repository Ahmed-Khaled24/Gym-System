import express from 'express'
import passport from 'passport'

const api = express();
api.use(express.json());
api.use(express.urlencoded({extended: true}));
api.use(passport.initialize());
api.use(passport.session());

export {api};