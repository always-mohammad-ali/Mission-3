//HIGHER ORDER FUNCTION -> IT WILL RETURN A FUNCTION 

import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";


const auth = () =>{
    return async(req : Request, res : Response, next : NextFunction) =>{
        try{
            const token = req.headers.authorization;
        
        //console.log({authToken : token});

        if(!token){
            return res.status(500).json({message : "you are not allowed"});
        }

        const decodeToken = jwt.verify(token, config.jwtSecret as string);

        console.log({decodeToken});

        req.user = decodeToken as JwtPayload;

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