import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UserType } from "../Models/UserModel";

interface UserContainer {
  user: UserType;
}

const secretKey = "secretkey";

export const getNewToken = (user: UserType): string => {
  const userContainer: UserContainer = { user };

  const options = { expiresIn: "3h" };

  const token = jwt.sign(userContainer, secretKey, options);

  return token;
};

export const verifyToken = (req: Request): Promise<boolean> => {
    return new Promise<boolean>((res, rej) => {
        try{
            const header = req.header("authorization");

            if(!header){
                res(false);
                return;
            }

            const token = header.substring(7);

            if(!token){
                res(false);
                return;
            }

            jwt.verify(token, secretKey, (err) => {
                if(err){
                    res(false);
                    return;
                }
                res(true);
            })
        }catch(err){
            rej(err)
        }
    })
}


export const verifyAdmin = async (req: Request): Promise<boolean> => {
    const isLoggedIn = await verifyToken(req);

    if(isLoggedIn === false) return false;

    const header = req.header("authorization");
    const token = header.substring(7);

    const container = jwt.decode(token) as UserContainer;

    const user = container.user;

    return user.role === 'admin';
}


export const  decodeAndExtractUserInformation= async (req: Request, res:Response, next:NextFunction )=> {
    const isLoggedIn = await verifyToken(req);
    
    if(isLoggedIn === false) return false;
    
    const header = req.header("authorization");
    if (!header) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = header.substring(7);
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    const container = jwt.decode(token) as UserContainer;
    
    const user = container.user;
    req.body  = user;
    next();

}