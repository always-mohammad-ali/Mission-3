import { pool } from "../../config/db";

const createTodosUsers = async(user_id : string, title : string) =>{
    const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`, [user_id, title]);

    return result;
}

const getTodosPost = async() =>{
    const result = await pool.query(`SELECT * FROM todos`);

    return result;
}

const getSingleTodosPost = async(id : string) =>{
    const result = await pool.query(`SELECT * FROM todos WHERE id=$1`,[id]);

    return result;
}

const updateTodosPost = async(title :string, completed : string, id : string) =>{
    const result = await pool.query(`UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING *`, [title, completed, id]);

    return result;
}

const deleteTodosPost = async(id : string) =>{
    const result = await pool.query(`DELETE FROM todos WHERE id=$1`, [id]);
    
    return result;
}
export const todosServices = {
    createTodosUsers,
    getTodosPost,
    getSingleTodosPost,
    updateTodosPost,
    deleteTodosPost

}