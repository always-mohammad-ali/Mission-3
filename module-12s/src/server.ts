import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/users/user.routes";
import { todosRouter } from "./modules/todos/todos.routes";


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
//app.delete("/users/:id",)


//TODOS CRUD OPERATION STARTS FROM HERE
app.use("/todos", todosRouter)
//POST TODO ACTIVITY
//app.post("/todos", )


// GET ALL TODO LISTS
//app.get("/todos",)

//GET SINGLE TODO LISTS BY CALLING SPECIFIC ID
//app.get("/todos/:id", )


//UPDATE SINGLE TODO LIST TITLE 
//app.put("/todos/:id", )


//DELETE TODO LIST BY MENTIONING ID
//app.delete("/todos/:id", )


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
