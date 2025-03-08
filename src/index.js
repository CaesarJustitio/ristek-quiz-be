import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import supabase from "./config/supabase.js";

dotenv.config();

const app = express();
const PORT = 2000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");

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

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
