import express from "express";
import {
  getQuestionsByTryoutId,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionById,
} from "../controllers/QuestionController.js";

const router = express.Router();

router.get("/tryouts/:tryout_id/questions", getQuestionsByTryoutId);
router.post("/questions", createQuestion);
router.put("/questions/:id", updateQuestion);
router.delete("/questions/:id", deleteQuestion);
router.get("/questions/:id", getQuestionById);

export default router;
