import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = req.header("token");

    // if there is no token
    if (!jwtToken) {
        return res.status(403).send("unauthorized");
    }


    const { JWT_SECRET } = process.env
    // check token
    try {
        jwt.verify(jwtToken, JWT_SECRET as string);
        next();
    } catch (err) {
        res.status(401).send("your token is not valid");
    }
}


export default verifyToken