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

export const todosControllers ={
    createTodosUsers,
    
}