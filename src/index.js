import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import supabase from "./config/supabase.js";
import userRoutes from "./routes/userRoutes.js";
import tryoutRoutes from "./routes/tryOutRoutes.js";
import questionRoutes from "./routes/QuestionRoutes.js";
import submissionRoutes from "./routes/SubmissionRoutes.js";

dotenv.config();

const app = express();
const PORT = 2000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(userRoutes);
app.use(tryoutRoutes);
app.use(questionRoutes);
app.use(submissionRoutes);

app.get("/users", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.get("/submissions", async (req, res) => {
  const { data, error } = await supabase.from("submission").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.get("/tryouts", async (req, res) => {
  const { data, error } = await supabase.from("tryout").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.get("/tryouts/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("tryout")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.get("/questions/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
