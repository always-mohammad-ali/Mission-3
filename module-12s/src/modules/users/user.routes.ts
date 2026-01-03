import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userController } from "./user.controller";

const router = express.Router();

//FOR POSTING USER DATA INTO DATABASE
router.post("/", userController.createUser)

//FOR GETTING ALL USER DATA
router.get("/", async(req : Request, res: Response) =>{

  try{

    const result = await pool.query(`SELECT * FROM users`);

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
})

export const userRoutes = router;