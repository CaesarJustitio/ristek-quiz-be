import express from "express";
import { getUsers, getUserById } from "../controllers/UserController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);

export default router;
