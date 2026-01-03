import express from "express"
import { todosControllers } from "./todos.controllers";

const router = express.Router();

router.post("/", todosControllers.createTodosUsers);

router.get("/", todosControllers.getTodosPost);


export const todosRouter = router;