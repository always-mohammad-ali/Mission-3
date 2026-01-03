import express from "express"
import { todosControllers } from "./todos.controllers";

const router = express.Router();

router.post("/", todosControllers.createTodosUsers);

router.get("/", todosControllers.getTodosPost);

router.get("/:id", todosControllers.getSingleTodosPost);

router.put("/:id", todosControllers.updateTodosPost);

router.delete("/:id", todosControllers.deleteTodosPost);


export const todosRouter = router;