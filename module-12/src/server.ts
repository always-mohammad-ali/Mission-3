import express, { Request, Response } from "express";
import {Pool} from "pg";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env")})

const app = express();
const port = 5000;

//DB
const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`
})

const initDB = async() =>{
  await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

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
}
initDB();


//adding parser to get the response after post as json
app.use(express.json());

//if you need to work with form data instead of json, then you can try this
app.use(express.urlencoded());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! I am Mohammad Ali')
})

app.post('/', (req: Request, res:Response)=>{
  console.log(req.body);

  res.status(201).json({success: true, message: "API IS WORKING"});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
