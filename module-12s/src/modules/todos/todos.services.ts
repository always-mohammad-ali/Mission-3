import { pool } from "../../config/db";

const createTodosUsers = async(user_id : string, title : string) =>{
    const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`, [user_id, title]);

    return result;
}

const getTodosPost = async() =>{
    const result = await pool.query(`SELECT * FROM todos`);

    return result;
}

export const todosServices = {
    createTodosUsers,
    getTodosPost,

}