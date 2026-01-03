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

const getSingleTodosPost = async(req : Request, res : Response) =>{
    
  

  try{
      const result = await todosServices.getSingleTodosPost(req.params.id!);

      if(result.rows.length === 0){
      res.status(404).json({
        success : false,
        message : "id doesn't match with existing todo list"
      })
    }else{
          res.status(200).json({
        success : true,
        message : "we get individuals todo list successfully by providing id",
        data : result.rows[0],
      })
    }


  }catch(err : any){
    res.status(500).json({
      success : false,
      message : "there is no such todo list in that specific user id"
    })
  }
}

const updateTodosPost = async(req : Request, res : Response) =>{
    const { title, completed } = req.body;

  try{
    const result = await todosServices.updateTodosPost(title, completed, req.params.id as string);

    if(result.rows.length === 0){
      res.status(404).json({
        success : false,
        message : "such id doesn't found",
      })
    }else{
      res.status(201).json({
        success : true, 
        message : "update todo list title successfully done",
        data : result.rows[0],
      })
    }

  }catch(err : any){
    res.status(500).json({
      success : false,
      message : "there is no such id to update data about that"
    })
  }
}

export const todosControllers ={
    createTodosUsers,
     getTodosPost,
     getSingleTodosPost,
     updateTodosPost
}