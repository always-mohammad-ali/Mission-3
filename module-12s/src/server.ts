import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/users/user.routes";


const app = express();
const port = config.port;

//parser
app.use(express.json());
//app.use(express.urlencoded());

//DATABASE WAS  BELOW HERE UNTIL INITDB(), BUT IT REMOVED TO db.ts FOR CLARITY IN SERVER.TS AND MORE EFFICIENT


//INITIALIZING DATABASE
initDB();

// LOGGER MIDDLEWARE was here down below, it also removed to distinct file



app.get("/",logger, (req: Request, res: Response) => {
  res.send("Hello World! hell yeah my goodness");
});

//USERS CRUD

//POST USER DATA
app.use("/users", userRoutes)
//app.post("/users", ); //instead of using this, we are now using the above line for making more concise and clear version for posting.

//FIND ALL USERS
//app.get("/users", )  //IT WILL ALSO EXECUTE THROUGH ABOVE LINE app.use("/users", userRoutes)

//GET SINGLE USER
//app.get("/users/:id", )

//UPDATE SINGLE USER BY USING PUT
//app.put("/users/:id", )

//DELETE SINGLE USER BY USING DELETE METHOD
app.delete("/users/:id", async(req : Request, res : Response) =>{
  try{
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [req.params.id,]);
    //console.log(result) if you give, you will get rowCount value there, if it is 0, then there is no user, if there is any user, then it will delete and the rowCount will be 1;
    if(result.rowCount === 0){
      res.status(404).json({
        success : false,
        message : "user not found"
      })
    }else{
      res.status(200).json({
        success : true,
        message : "user data deleted successfully",
        deletedCount : result.rowCount,
        data : result.rows
      })
    }
  }catch(err : any){
    res.status(500).json({
      success : false,
      message : err.message
    })
  }
})


//TODOS CRUD OPERATION STARTS FROM HERE

//POST TODO ACTIVITY
app.post("/todos", async(req : Request, res : Response) =>{
    const {user_id, title} = req.body;
  try{
    const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`, [user_id, title]);
    
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
})


// GET ALL TODO LISTS
app.get("/todos", async(req : Request, res: Response) =>{

  try{

    const result = await pool.query(`SELECT * FROM todos`);

    

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
})

//GET SINGLE TODO LISTS BY CALLING SPECIFIC ID
app.get("/todos/:id", async(req : Request, res : Response) =>{
    
  

  try{
      const result = await pool.query(`SELECT * FROM todos WHERE id=$1`,[req.params.id]);

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
})


//UPDATE SINGLE TODO LIST TITLE 
app.put("/todos/:id", async(req : Request, res : Response) =>{
    const { title, completed } = req.body;

  try{
    const result = await pool.query(`UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING *`, [title, completed, req.params.id]);

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
})


//DELETE TODO LIST BY MENTIONING ID
app.delete("/todos/:id", async(req : Request, res : Response) =>{

  try{
    
    const result = await pool.query(`DELETE FROM todos WHERE id=$1`, [req.params.id]);

    if(result.rowCount === 0){
      res.status(404).json({
        success : false,
        message : "todos not found"
      })
    }else{
      res.status(200).json({
        success : true,
        message : "todos data deleted successfully",
        deletedCount : result.rowCount,
        data : result.rows
      })
    }


  }catch(err : any){
    res.status(500).json({
      success : false,
      message : err.message
    })
  }
})


// 404 NOT FOUND FOR INVALID URL 
app.use((req : Request, res : Response) =>{
    res.status(404).json({
      success : false,
      message : "invalid url provided, plz check it again",
      path : req.path
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
