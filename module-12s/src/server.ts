import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({path : path.join(process.cwd(), ".env")})

const app = express();
const port = 5000;

//parser
app.use(express.json());
//app.use(express.urlencoded());

//DATABASE

const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STRING}`,
});


const initDB = async() =>{
  try{
       await pool.query(`
          CREATE TABLE IF NOT EXISTS users(
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(150) UNIQUE NOT NULL,
          age INT,
          phone VARCHAR(15),
          address TEXT,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
          )
        `);
        console.log("users table created");

    await pool.query(`
           CREATE TABLE IF NOT EXISTS todos(
           id SERIAL PRIMARY KEY,
           user_id INT REFERENCES users(id) ON DELETE CASCADE,
           title VARCHAR(200) NOT NULL,
           description TEXT,
           completed BOOLEAN DEFAULT false,
           due_date DATE,
           created_at TIMESTAMP DEFAULT NOW(),
           updated_at TIMESTAMP DEFAULT NOW()
           )
        `)
        console.log("todos table created");
  }
  catch(error){
    console.log("error message : ");
  }
    
}

initDB();


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! hell yeah my goodness");
});

//USERS CRUD

app.post("/users", async(req: Request, res: Response) => {
  //console.log(req.body);
  const {name, email} = req.body;

  try{
     const result = await pool.query(`INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`, [name, email]);

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

});

//FIND ALL USERS
app.get("/users", async(req : Request, res: Response) =>{

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

//GET SINGLE USER
app.get("/users/:id", async(req : Request, res : Response) =>{
 // console.log(req.params.id);
 // res.send({ message : "single user is cool" });

 try{

  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [req.params.id]);
  
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


})

//UPDATE SINGLE USER BY USING PUT
app.put("/users/:id", async(req : Request, res : Response) =>{

  const {name, email} = req.body;

  try{

    const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`, [name, email, req.params.id]);

    if(result.rows.length === 0){
      res.status(404).json({
            success : false,
            message : "user id not found for update"
      })
    }else{
      res.status(201).json({
        success : true,
        message : "update user data",
        data : result.rows[0]
      })
    }

  }catch(err : any){
    res.status(500).json({
      success : false,
      message : err.message
    })
  }
})

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




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
