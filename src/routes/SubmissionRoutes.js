import express from "express";
import {
  startTryout,
  createSubmission,
  getSubmissions,
  getSubmissionsByTryoutId,
} from "../controllers/SubmissionController.js";

const router = express.Router();

router.get("/tryouts/:tryout_id/submissions", getSubmissionsByTryoutId);

router.post("/submissions", createSubmission);

router.post("/submissions/:tryout_id", startTryout);

export default router;
