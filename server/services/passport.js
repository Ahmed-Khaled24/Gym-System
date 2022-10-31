import passport from 'passport'
import LocalStrategy from 'passport-local';
import {db_getAdminById, db_getAdminByLoginId} from '../models/admin/admin.model.js'
import {validatePassword} from '../util/password.js'

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    try{
        const user = await db_getAdminById(id);
        done(null, user);
    } catch(err){
        done(err)
    }
})

const localOptions = {
    usernameField: 'loginId',
    passportField: 'password',
}
async function localVerify(loginId, password, done){
    const user = await db_getAdminByLoginId(loginId);
    try {
        if(user){
            const valid = await validatePassword(password, user.password);
            if(valid){
                return done(null, user);
            } else {
                return done(null, false);
            }
        } else {
            return done(null, false)
        }
    } catch(err){ 
        return done(err)
    }
}

passport.use(new LocalStrategy( localOptions, localVerify));