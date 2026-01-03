import { Request, Response } from "express";
import { todosServices } from "./todos.services";

const createTodosUsers = async(req : Request, res : Response) =>{
    const {user_id, title} = req.body;
  try{
    const result = await todosServices.createTodosUsers(user_id, title);
    
    res.status(201).json({
      success : true,
      message : "todos post successfully done",
      data : result.rows[0],
    })

  }catch(err : any){
    res.status(500).json({
      success : false,
      message : "todos post failed because it didn't find user id value"
    })
  }
}

const getTodosPost =  async(req : Request, res: Response) =>{

  try{

    const result = await todosServices.getTodosPost();

    

    res.status(200).json({
      success : true,
      message : "all todos data retrieved done",
      data : result.rows,
    })

  }catch(err : any){
     res.status(500).json({
      success : false,
      message : err.message,
     
     })
  }
}

export const todosControllers ={
    createTodosUsers,
     getTodosPost,
}