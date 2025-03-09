import express from "express";
import {
  getTryouts,
  getTryoutById,
  createTryout,
  updateTryout,
  deleteTryout,
} from "../controllers/TryOutController.js";

const router = express.Router();

router.get("/tryouts", getTryouts);
router.get("/tryouts:id", getTryoutById);
router.post("/tryouts", createTryout);
router.put("/tryouts/:id", updateTryout);
router.delete("/tryouts/:id", deleteTryout);

export default router;
