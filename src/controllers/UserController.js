import supabase from "../config/supabase.js";

export const getUsers = async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};
