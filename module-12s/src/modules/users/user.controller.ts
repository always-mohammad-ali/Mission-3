import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

//FOR POST USERS REQ AND RES HANDLER
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

//FOR GET ALL USERS REQ AND RES
const getUser = async(req : Request, res: Response) =>{

  try{

    const result = await userServices.getUser();

    res.status(200).json({
      success : true,
      message : "all user data retrieved done",
      data : result.rows,
    })

  }catch(err : any){
     res.status(500).json({
      success : false,
      message : err.message,
     
     })
  }
}


//FOR SINGLE USER REQ AND RES
const getSingleUser = async(req : Request, res : Response) =>{
 // console.log(req.params.id);
 // res.send({ message : "single user is cool" });

 try{

  const result = await userServices.getSingleUser(req.params.id!);
  
  if(result.rows.length === 0){
    res.status(404).json({
      success : false,
      message : "user not found"
    })
  }else{
    res.status(200).json({
      success : true,
      message : "single user data fetched successfully",
      data : result.rows[0]
    })
  }

 }catch(err : any){
  res.status(500).json({
    success : false,
    message : err.message,
    details : err
  })
 }


}

export const userController = {
    createUser,
    getUser,
    getSingleUser
}