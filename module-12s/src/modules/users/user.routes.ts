import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userController } from "./user.controller";

const router = express.Router();

//FOR POSTING USER DATA INTO DATABASE
router.post("/", userController.createUser);

//FOR GETTING ALL USER DATA
router.get("/", userController.getUser);

//FOR GETTING SINGLE USER DATA
router.get("/:id", userController.getSingleUser);

//FOR UPDATING SINGLE USER DATA
router.put("/:id", userController.updateUser);

export const userRoutes = router;