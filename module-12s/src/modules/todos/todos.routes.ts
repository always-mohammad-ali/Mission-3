import express from "express"
import { todosControllers } from "./todos.controllers";

const router = express.Router();

router.post("/", todosControllers.createTodosUsers);


export const todosRouter = router;