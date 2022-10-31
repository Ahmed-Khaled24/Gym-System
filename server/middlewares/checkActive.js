import {db_getAdminById} from '../models/admin/admin.model.js'
export default async function checkActive(req, res, next){
    const admin = await db_getAdminById(req.user.id);
    if(admin.active){
        next();
    } else {
        res.status(401).json({
            status: 'failure',
            message: 'inactive admins cannot perform such tasks, activate you account or شوف حد ينيكك'
        })
    }
}