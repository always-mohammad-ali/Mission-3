import express, { Request, Response } from "express";
import { Pool } from "pg";

const app = express();
const port = 5000;

//parser
app.use(express.json());
//app.use(express.urlencoded());

//DATABASE

const pool = new Pool({
  connectionString: `postgresql://neondb_owner:npg_gAaOUMbIjx12@ep-square-cherry-ahd3uy3d-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`,
});





app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! hell yeah my goodness");
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(201).json({
    success: true,
    message: "API is working man",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
