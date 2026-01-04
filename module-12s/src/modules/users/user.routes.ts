import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userController } from "./user.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";

const router = express.Router();

//FOR POSTING USER DATA INTO DATABASE
router.post("/", userController.createUser);

//FOR GETTING ALL USER DATA
router.get("/", logger, auth("auth"), userController.getUser);

//FOR GETTING SINGLE USER DATA
router.get("/:id", userController.getSingleUser);

//FOR UPDATING SINGLE USER DATA
router.put("/:id", userController.updateUser);

//FOR DELETING SINGLE USER DATA
router.delete("/:id", userController.deleteUser);

export const userRoutes = router;