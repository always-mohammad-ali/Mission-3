//HIGHER ORDER FUNCTION -> IT WILL RETURN A FUNCTION 

import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
import config from "../config";


const auth = () =>{
    return (req : Request, res : Response, next : NextFunction) =>{
        const token = req.headers.authorization;
        
        //console.log({authToken : token});

        if(!token){
            return res.status(500).json({message : "you are not allowed"});
        }

        const decodeToken = jwt.verify(token, config.jwtSecret as string);

        console.log({decodeToken});

        next();
    }
}

export default auth;