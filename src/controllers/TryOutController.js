import TryoutModel from "../models/TryoutModel.js";

export const getTryouts = async (req, res) => {
  try {
    const { title, category, date } = req.query;
    const tryouts = await TryoutModel.getAllTryouts({ title, category, date });
    res.json(tryouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTryoutById = async (req, res) => {
  try {
    const tryout = await TryoutModel.getTryoutById(req.params.id);
    if (!tryout) return res.status(404).json({ error: "Tryout not found" });
    res.json(tryout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTryout = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const tryout = await TryoutModel.createTryout(req.body);
    res.status(201).json(tryout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTryout = async (req, res) => {
  try {
    const { id } = req.params;
    const updateTryout = await TryoutModel.updateTryout(id, req.body);
    if (!updateTryout)
      return res.status(404).json({ error: "Tryout not found" });
    res.json(updateTryout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTryout = async (req, res) => {
  try {
    const { id } = req.params;
    await TryoutModel.deleteTryout(id);
    res.json({ message: "Tryout deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
