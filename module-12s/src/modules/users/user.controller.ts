import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUser = async(req: Request, res: Response) => {
  //console.log(req.body);
  const {name, email} = req.body;

  try{
    //BUSINESS LOGIC WILL BE GONE TO SERVICES , AND THIS CONTROLLER RESPONSIBLE FOR HANDLING RES AND REQ.
     const result = await userServices.createUser(name, email);

    // console.log(result.rows[0]);
    // res.send({ message : "data inserted"})

    res.status(201).json({
      success : true,
      message : "data inserted successfully",
      data : result.rows[0]

    
    })

  }catch(err : any){
    res.status(500).json({
      success : false,
      message : err.message,
    
    })
  }

}

export const userController = {
    createUser,
}