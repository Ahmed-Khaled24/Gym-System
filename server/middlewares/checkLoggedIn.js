export default function checkLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        res.status(401).json({
            status: 'failure',
            message: 'login required',
        })
    }
}