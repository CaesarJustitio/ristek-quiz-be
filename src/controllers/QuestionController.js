import QuestionModel from "../models/QuestionModel.js";
import TryoutModel from "../models/TryoutModel.js";

const isEditable = async (tryout_id) => {
  const tryout = await TryoutModel.getTryoutById(tryout_id);
  return tryout && !tryout.submission_status;
};

export const getQuestionsByTryoutId = async (req, res) => {
  try {
    const { tryout_id } = req.params;
    const questions = await QuestionModel.getQuestionsByTryoutId(tryout_id);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await QuestionModel.getQuestionById(id);
    if (!question) return res.status(404).json({ error: "Question not found" });
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const { tryout_id, question_text, answer } = req.body;

    if (!tryout_id || !question_text || answer === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const canEdit = await isEditable(tryout_id);
    if (!canEdit) {
      return res
        .status(403)
        .json({ error: "Cannot add questions to a submitted tryout" });
    }

    const question = await QuestionModel.createQuestion(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await QuestionModel.getQuestionById(id);

    if (!question) return res.status(404).json({ error: "Question not found" });

    const canEdit = await isEditable(question.tryout_id);
    if (!canEdit) {
      return res
        .status(403)
        .json({ error: "Cannot update questions in a submitted tryout" });
    }

    const updatedQuestion = await QuestionModel.updateQuestion(id, req.body);
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await QuestionModel.getQuestionById(id);

    if (!question) return res.status(404).json({ error: "Question not found" });

    const canEdit = await isEditable(question.tryout_id);
    if (!canEdit) {
      return res
        .status(403)
        .json({ error: "Cannot delete questions from a submitted tryout" });
    }

    await QuestionModel.deleteQuestion(id);
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
