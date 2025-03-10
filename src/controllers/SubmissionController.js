import SubmissionModel from "../models/SubmissionModel.js";

export const getSubmissions = async (req, res) => {
  try {
    const submissions = await SubmissionModel.getSubmissions();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSubmission = async (req, res) => {
  try {
    const { tryout_id, correct_answer, grade } = req.body;

    if (!tryout_id || correct_answer === undefined || grade === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const submission = await SubmissionModel.createSubmission({
      tryout_id,
      correct_answer,
      grade,
      created_at: new Date().toISOString(),
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const startTryout = async (req, res) => {
  try {
    const { tryout_id } = req.params;

    if (!tryout_id) {
      return res.status(400).json({ error: "Tryout ID is required" });
    }

    let submission = await SubmissionModel.getSubmissionByTryoutId(tryout_id);

    if (!submission) {
      submission = await SubmissionModel.createSubmission({
        tryout_id,
        correct_answer: 0,
        grade: 0,
        created_at: new Date().toISOString(),
      });
    }

    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSubmissionsByTryoutId = async (req, res) => {
  try {
    const { tryout_id } = req.params;
    const submissions = await SubmissionModel.getSubmissionsByTryoutId(
      tryout_id
    );
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
