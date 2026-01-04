//HIGHER ORDER FUNCTION -> IT WILL RETURN A FUNCTION 

import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

//roles = ["admin", "user"]
const auth = (...roles : string[]) =>{
    return async(req : Request, res : Response, next : NextFunction) =>{
        try{
            const token = req.headers.authorization;
        
        //console.log({authToken : token});

        if(!token){
            return res.status(500).json({message : "you are not allowed"});
        }

        const decodeToken = jwt.verify(token, config.jwtSecret as string) as JwtPayload;

        console.log({decodeToken});

        req.user = decodeToken;


        if(roles.length && roles.includes(decodeToken.role as string)){
            return res.status(500).json({
                error : "unauthorized",
            })
        }

        next();
        }catch(err : any){
            res.status(500).json({
                success : false,
                message : err.any
            })
        }
    }
}

export default auth;