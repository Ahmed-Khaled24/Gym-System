import {db_getAdminById} from '../models/admin/admin.model.js'
export default async function checkSuper(req, res, next){
    const admin = await db_getAdminById(req.user.id);
    if(admin.super){
        next();
    } else {
        res.status(401).json({
            status: 'failure',
            message: 'regular admins cannot perform such tasks, promote you account to super admin or شوف حد ينيكك'
        })
    }
}