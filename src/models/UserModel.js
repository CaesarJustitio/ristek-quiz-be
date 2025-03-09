import supabase from "../config/supabase.js";

const UserModel = {
  async getAllUsers() {
    const { data, error } = await supabase.from("users").select("*");
    if (error) throw new Error(error.message);
    return data;
  },

  async getUserById(id) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async createUser(userData) {
    const { data, error } = await supabase
      .from("users")
      .insert([userData])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async updateUser(id, userData) {
    const { data, error } = await supabase
      .from("users")
      .update(userData)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async deleteUser(id) {
    const { data, error } = await supabase.from("users").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return data;
  },
};

export default UserModel;
