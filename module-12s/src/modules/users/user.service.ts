import { pool } from "../../config/db";

//BUSINESS LOGIC FOR CREATEUSER IN SERVICE USING POST
const createUser = async(name : string, email : string) =>{
    const result = await pool.query(`INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`, [name, email]);

    return result;
}

//BUSINESS LOGIC FOR GET ALL USER DATA IN SERVICE USING GET
const getUser = async() =>{
    const result = await pool.query(`SELECT * FROM users`);

    return result;
}


//BUSINESS LOGIC FOR GET SINGLE USER DATA IN SERVICE USING GET
const getSingleUser = async(id :string) =>{
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

    return result;
}

export const userServices ={
    createUser,
    getUser,
    getSingleUser
}