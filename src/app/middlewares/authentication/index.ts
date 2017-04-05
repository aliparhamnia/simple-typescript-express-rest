import { Request, Response, NextFunction} from 'express';
function Authentication_Check (req: Request, res: Response, next: NextFunction) {
    const requestPathParts = req.path.split('/');
    if (
        requestPathParts.length>3 
    &&  (
        !req.session.user
    ||  !req.session.user.username
    ||  req.session.user.username.length<2
        )
    && process.env.MODULES_FOR_ALL.indexOf(`/${requestPathParts[3]}/`)==-1
    && process.env.MODULES_FOR_USERS.indexOf(`/${requestPathParts[3]}/`)>-1
    ) {
        res.json({error:"unauthorized", reason:"You are not authorized to access this api module."})
        return;
    }
    next();
}

export default Authentication_Check;